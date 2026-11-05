// Lightweight Liquid/Markdown preview; production still uses GitHub Pages/Jekyll.
const fs = require("node:fs/promises");
const path = require("node:path");
const http = require("node:http");
const extraModules = (process.env.TCLAB_TEST_MODULES || "").split(path.delimiter).filter(Boolean);
const dependency = (name) => require(require.resolve(name, { paths: [__dirname, ...extraModules] }));
const { Liquid } = dependency("liquidjs");
const { marked } = dependency("marked");
const repo = path.resolve(__dirname, "..");
const baseurl = "/TCLab";
const liquid = new Liquid();
liquid.registerFilter("relative_url", (value) => baseurl + value);
liquid.registerFilter("jsonify", JSON.stringify);

async function renderHome(zh) {
  const source = await fs.readFile(path.join(repo, zh ? "zh/index.md" : "index.md"), "utf8");
  const site = { title: "TC Lab", time: new Date(), data: { lab_platforms: JSON.parse(await fs.readFile(path.join(repo, "_data/lab_platforms.json"), "utf8")) } };
  const context = { site, page: { title: zh ? "首頁" : "Home", url: zh ? "/zh/" : "/", lab_explorer: true } };
  const include = await liquid.parseAndRender(await fs.readFile(path.join(repo, "_includes/lab-explorer.html"), "utf8"), { ...context, include: { lang: zh ? "zh" : "en" } });
  const body = source.replace(/^---[\s\S]*?---\s*/, "").replace(/{% include lab-explorer\.html lang="(?:en|zh)" %}/, include);
  const content = marked.parse(await liquid.parseAndRender(body, context));
  return liquid.parseAndRender(await fs.readFile(path.join(repo, "_layouts/default.html"), "utf8"), { ...context, content });
}

function startServer(port = 4175) {
  const server = http.createServer(async (req, res) => {
    try {
      let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      if (pathname.startsWith(baseurl + "/")) pathname = pathname.slice(baseurl.length);
      if (pathname === "/" || pathname === "/zh/") {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(await renderHome(pathname === "/zh/"));
        return;
      }
      const file = path.resolve(repo, "." + pathname);
      if (!file.startsWith(repo + path.sep) || !pathname.startsWith("/assets/")) {
        res.writeHead(404).end();
        return;
      }
      const types = { ".css": "text/css", ".js": "application/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png" };
      res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
      res.end(await fs.readFile(file));
    } catch (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500).end(error.message);
    }
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

module.exports = { startServer, renderHome, dependency };
if (require.main === module) startServer(Number(process.env.PORT || 4175)).then(() => console.log("TC Lab preview: http://127.0.0.1:" + (process.env.PORT || 4175) + "/TCLab/"));
