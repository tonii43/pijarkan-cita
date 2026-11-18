(() => {
  "use strict";

  function loadImage(slot) {
    const image = new Image();
    image.alt = slot.dataset.alt ?? "";
    image.decoding = "async";
    image.addEventListener("load", () => slot.replaceChildren(image), { once: true });
    image.src = slot.dataset.optionalImage;
  }

  const slots = document.querySelectorAll("[data-optional-image]");
  if (!("IntersectionObserver" in window)) {
    slots.forEach(loadImage);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      loadImage(target);
    }
  });

  slots.forEach((slot) => observer.observe(slot));
})();

