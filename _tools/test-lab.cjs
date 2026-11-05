const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { startServer, dependency } = require("./preview.cjs");
const { chromium } = dependency("playwright");

(async () => {
  const config = JSON.parse(await fs.readFile(path.join(__dirname, "../_data/lab_platforms.json"), "utf8"));
  assert.equal(new Set(config.platforms.map((p) => p.id)).size, 5);
  assert.equal(config.platforms.filter((p) => p.external).length, 1);
  for (const platform of config.platforms) {
    await fs.access(path.join(__dirname, "..", platform.asset));
    for (const lang of ["en", "zh"]) {
      for (const field of ["title", "shortLabel", "description", "researchFocus", "groupLeader"]) assert.ok(platform[lang][field]);
      assert.ok(Array.isArray(platform[lang].teamMembers));
    }
  }
  const server = await startServer(0);
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.TCLAB_BROWSER_CHANNEL ? { channel: process.env.TCLAB_BROWSER_CHANNEL } : {}) });
    const origin = `http://127.0.0.1:${server.address().port}`;
    const screenshotDir = process.env.TCLAB_SCREENSHOTS || path.join(require("node:os").tmpdir(), "tclab-lab-screenshots");
    await fs.mkdir(screenshotDir, { recursive: true });
    for (const lang of ["en", "zh"]) {
      for (const width of [1440, 1280, 768, 390, 320]) {
        const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.route("**/*", (route) => route.request().url().startsWith(origin) ? route.continue() : route.abort());
        await page.goto(origin + "/TCLab/" + (lang === "zh" ? "zh/" : ""));
        await page.locator(".lab-explorer.is-ready").waitFor({ timeout: 10000 }).catch(async (error) => {
          console.error("Page diagnostics:", errors, (await page.content()).slice(-1200));
          throw error;
        });
        assert.equal(await page.locator(".lab-platform").count(), 5);
        assert.equal(await page.locator(".lab-platform-art").evaluateAll((images) => images.every((img) => img.complete && img.naturalWidth > 0)), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${lang} ${width}: page overflow`);
        const buttons = page.locator(".lab-platform");
        if (width >= 1280) {
          await buttons.nth(3).scrollIntoViewIfNeeded();
          const before = await page.locator(".lab-map").boundingBox();
          await buttons.nth(3).hover();
          assert.equal(await page.locator("#lab-info-title").innerText(), config.platforms[3][lang].title);
          assert.equal(await buttons.nth(3).getAttribute("class"), "lab-platform is-active");
          assert.deepEqual(await page.locator(".lab-map").boundingBox(), before);
          assert.equal(await page.locator(".lab-connection").evaluate((el) => getComputedStyle(el).animationName), "none");
        }
        for (let index = 0; index < config.platforms.length; index++) {
          const platform = config.platforms[index];
          await buttons.nth(index).focus();
          assert.equal(await page.locator("#lab-info-title").innerText(), platform[lang].title);
          await buttons.nth(index).press("Enter");
          assert.equal(await page.locator("dialog").evaluate((d) => d.open), true);
          assert.equal(await page.locator("#lab-dialog-title").innerText(), platform[lang].title);
          assert.ok((await page.locator("dialog [data-field=researchFocus]").innerText()).length > 0);
          await page.keyboard.press("Escape");
          assert.equal(await buttons.nth(index).evaluate((b) => b === document.activeElement), true);
        }
        await buttons.first().focus();
        await page.keyboard.press("ArrowRight");
        assert.equal(await buttons.nth(1).evaluate((b) => b === document.activeElement), true);
        await page.locator("[data-open-details]").click();
        await page.locator("[data-close-details]").click();
        assert.equal(await page.locator("dialog").evaluate((d) => d.open), false);
        await page.locator("#lab-heading").scrollIntoViewIfNeeded();
        await page.locator(".lab-map-scroll").evaluate((el) => { el.scrollLeft = 0; });
        await page.screenshot({ path: path.join(screenshotDir, `${lang}-${width}.png`), fullPage: true });
        assert.deepEqual(errors, []);
        console.log(`PASS ${lang} ${width}px: artwork, five platforms, modal, focus, arrows, no overflow`);
        await page.close();
      }
      const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      await mobile.route("**/*", (route) => route.request().url().startsWith(origin) ? route.continue() : route.abort());
      await mobile.goto(origin + "/TCLab/" + (lang === "zh" ? "zh/" : ""));
      await mobile.locator(".lab-platform").first().tap();
      assert.equal(await mobile.locator("dialog").evaluate((d) => d.open), true);
      await mobile.locator("[data-close-details]").tap();
      await mobile.locator("[data-select-platform=synchrotron]").tap();
      assert.equal(await mobile.locator("#lab-info-title").innerText(), config.platforms[4][lang].title);
      assert.ok(await mobile.locator(".lab-map-scroll").evaluate((el) => el.scrollLeft > 0));
      await mobile.locator("[data-open-details]").tap();
      assert.equal(await mobile.locator("#lab-dialog-title").innerText(), config.platforms[4][lang].title);
      await mobile.locator("[data-close-details]").tap();
      await mobile.close();
      const fallback = await browser.newPage({ javaScriptEnabled: false });
      await fallback.route("**/*", (route) => route.request().url().startsWith(origin) ? route.continue() : route.abort());
      await fallback.goto(origin + "/TCLab/" + (lang === "zh" ? "zh/" : ""));
      await fallback.locator(".lab-static-content summary").click();
      assert.equal(await fallback.locator(".lab-static-content h3").count(), 5);
      await fallback.close();
      console.log(`PASS ${lang}: touch and no-JavaScript fallback`);
    }
    console.log(`Screenshots: ${screenshotDir}`);
  } finally {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
