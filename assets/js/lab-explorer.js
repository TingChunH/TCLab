(() => {
  "use strict";

  document.querySelectorAll("[data-lab-explorer]").forEach((root) => {
    const config = JSON.parse(root.querySelector("[data-lab-config]").textContent);
    const lang = root.dataset.lang;
    const ui = config.ui[lang];
    const platforms = new Map(config.platforms.map((platform) => [platform.id, platform]));
    const buttons = Array.from(root.querySelectorAll("[data-platform]"));
    const indexButtons = Array.from(root.querySelectorAll("[data-select-platform]"));
    const panel = root.querySelector(".lab-info");
    let displayedId;

    function fill(container, id) {
      const platform = platforms.get(id);
      const data = platform[lang];
      container.style.setProperty("--zone-accent", platform.accent);
      container.querySelectorAll("[data-field]").forEach((element) => {
        const field = element.dataset.field;
        const value = field === "category"
          ? `${platform.number} / ${platform.external ? ui.external : ui.interior}`
          : data[field];
        element.textContent = Array.isArray(value) ? value.join(lang === "zh" ? "、" : ", ") : value || ui.unassigned;
      });
    }

    function preview(id) {
      if (displayedId === id) return;
      displayedId = id;
      fill(panel, id);
      buttons.forEach((button) => button.classList.toggle("is-active", button.dataset.platform === id));
    }

    function select(id) {
      buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.platform === id)));
      indexButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.selectPlatform === id)));
      preview(id);
    }

    buttons.forEach((button, index) => {
      button.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "touch") preview(button.dataset.platform);
      });
      button.addEventListener("focus", () => preview(button.dataset.platform));
      button.addEventListener("click", () => select(button.dataset.platform));
      button.addEventListener("keydown", (event) => {
        const offset = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
        if (!offset) return;
        event.preventDefault();
        buttons[(index + offset + buttons.length) % buttons.length].focus();
      });
    });
    indexButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.selectPlatform;
        select(id);
        const target = buttons.find((item) => item.dataset.platform === id);
        const scroll = root.querySelector(".lab-map-scroll");
        scroll.scrollLeft = target.offsetLeft - (scroll.clientWidth - target.offsetWidth) / 2;
      });
    });
    select(config.platforms[0].id);
    panel.hidden = false;
    root.classList.add("is-ready");
  });
})();
