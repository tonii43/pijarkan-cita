(() => {
  "use strict";

  const overview = document.querySelector(".overview");
  const allowMotion = matchMedia("(prefers-reduced-motion: no-preference)");
  const silhouettes = [...overview.querySelectorAll("[data-parallax]")];
  const visible = new Set();
  let parallaxFrame = 0;
  let glowFrame = 0;

  function moveSilhouettes() {
    parallaxFrame = 0;
    if (!allowMotion.matches) return;

    const center = window.innerHeight / 2;
    const distance = window.innerWidth <= 540 ? 28 : 56;
    for (const layer of visible) {
      const section = layer.parentElement.getBoundingClientRect();
      const progress = (section.top + section.height / 2 - center) / (center + section.height / 2);
      const shift = Math.max(-1, Math.min(1, progress)) * distance;
      layer.style.setProperty("--scroll-shift", shift.toFixed(1) + "px");
    }
  }

  function queueParallax() {
    if (allowMotion.matches && !parallaxFrame) {
      parallaxFrame = requestAnimationFrame(moveSilhouettes);
    }
  }

  if ("IntersectionObserver" in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        const layer = target.querySelector("[data-parallax]");
        if (isIntersecting) {
          visible.add(layer);
          if (target.hasAttribute("data-scroll-section")) target.classList.add("has-entered");
        } else {
          visible.delete(layer);
        }
      }
      queueParallax();
    });
    silhouettes.forEach((layer) => sceneObserver.observe(layer.parentElement));
    overview.classList.add("defers-sections");

    const supportsScrollAnimation = CSS.supports("animation-timeline", "view()")
      && CSS.supports("animation-range", "entry 0% cover 22%");

    if (!supportsScrollAnimation) {
      const revealObserver = new IntersectionObserver((entries) => {
        for (const { target, intersectionRatio } of entries) {
          if (intersectionRatio < .08) continue;
          if (allowMotion.matches) target.classList.add("has-revealed");
          revealObserver.unobserve(target);
        }
      }, { threshold: .08 });
      overview.querySelectorAll("[data-reveal]").forEach((item) => revealObserver.observe(item));
    }
  } else {
    silhouettes.forEach((layer) => visible.add(layer));
    queueParallax();
  }

  window.addEventListener("scroll", queueParallax, { passive: true });
  window.addEventListener("resize", queueParallax, { passive: true });

  function hideGlow() {
    cancelAnimationFrame(glowFrame);
    overview.classList.remove("is-tracking");
  }

  overview.addEventListener("pointermove", (event) => {
    if (!allowMotion.matches || event.pointerType !== "mouse") return;

    cancelAnimationFrame(glowFrame);
    glowFrame = requestAnimationFrame(() => {
      overview.style.setProperty("--glow-x", event.clientX + "px");
      overview.style.setProperty("--glow-y", event.clientY + "px");
      overview.classList.add("is-tracking");
    });
  }, { passive: true });
  overview.addEventListener("pointerleave", hideGlow);

  allowMotion.addEventListener?.("change", () => {
    hideGlow();
    if (allowMotion.matches) {
      queueParallax();
    } else {
      cancelAnimationFrame(parallaxFrame);
      parallaxFrame = 0;
      silhouettes.forEach((layer) => layer.style.removeProperty("--scroll-shift"));
    }
  });
})();

