(() => {
  "use strict";

  const config = window.CAMPAIGN_CONFIG ?? {};

  for (const frame of document.querySelectorAll("[data-asset]")) {
    const asset = config.images?.[frame.dataset.asset];
    if (!asset?.src) continue;

    frame.hidden = false;
    frame.querySelector(".asset-path").textContent = asset.src.replace(/^\.\//, "");

    const image = new Image();
    image.alt = asset.alt ?? "";
    image.decoding = "async";
    if (asset.fit) image.style.objectFit = asset.fit;
    if (asset.position) image.style.objectPosition = asset.position;

    image.addEventListener("load", () => {
      frame.querySelector(".asset-placeholder").hidden = true;
      frame.classList.add("has-image");
      frame.append(image);
    }, { once: true });
    image.src = asset.src;
  }

  if (config.baskervilleFont && "fonts" in document) {
    const font = new FontFace(
      "Baskerville Campaign",
      `url(${JSON.stringify(config.baskervilleFont)})`,
      { style: "italic" },
    );
    font.load().then((loadedFont) => document.fonts.add(loadedFont)).catch(() => {
      // Gunakan font cadangan jika file webfont belum tersedia.
    });
  }

  const list = document.querySelector("#campaign-links");
  const template = document.querySelector("#link-card");

  for (const link of config.links ?? []) {
    if (!link.title?.trim()) continue;

    const url = link.url?.trim() ?? "";
    const isAvailable = /^https?:\/\/[^\s]+$/i.test(url) || /^\.\/[^\s\\]+$/.test(url);
    const card = document.createElement(isAvailable ? "a" : "div");
    card.className = link.featured ? "link-card featured" : "link-card";
    card.append(template.content.cloneNode(true));

    const icon = card.querySelector(".card-icon");
    icon.dataset.icon = ["document", "folder"].includes(link.icon) ? link.icon : "link";
    card.querySelector(".card-title").textContent = link.title;
    const description = card.querySelector(".card-description");
    description.textContent = link.description ?? "";
    description.hidden = !link.description;

    if (link.preview?.src) {
      const preview = card.querySelector(".card-preview");
      const image = preview.querySelector("img");
      image.alt = link.preview.alt ?? "";
      image.addEventListener("error", () => { preview.hidden = true; }, { once: true });
      preview.hidden = false;
      image.src = link.preview.src;
    }

    const action = card.querySelector(".card-action");
    if (isAvailable) {
      card.href = url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      action.classList.add("open-icon");
      action.textContent = "↗";
      action.setAttribute("aria-hidden", "true");
      const newTab = document.createElement("span");
      newTab.className = "visually-hidden";
      newTab.textContent = " (buka di tab baru)";
      card.append(newTab);
    } else {
      action.classList.add("link-status");
      action.textContent = "Segera tersedia";
    }

    const item = document.createElement("li");
    item.append(card);
    list.append(item);
  }

  document.querySelector("#links-empty").hidden = list.childElementCount > 0;
})();
