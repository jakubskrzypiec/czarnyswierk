document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".intro-loader");
  document.body.classList.add("is-loading");

  setTimeout(() => {
    loader?.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
  }, 2200);

  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const topbar = document.querySelector(".topbar");
  let lastY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (!topbar) return;

    const y = window.scrollY;

    if (y > lastY && y > 140) {
      topbar.style.transform = "translateX(-50%) translateY(-135%)";
      topbar.style.opacity = "0";
    } else {
      topbar.style.transform = "translateX(-50%) translateY(0)";
      topbar.style.opacity = "1";
    }

    lastY = Math.max(y, 0);
  }, { passive: true });

  const heroImg = document.querySelector(".hero-image img");

  const heroParallax = () => {
    if (!heroImg) return;
    const y = Math.min(window.scrollY, window.innerHeight);
    heroImg.style.transform = `scale(1.04) translateY(${y * 0.10}px)`;
  };

  window.addEventListener("scroll", heroParallax, { passive: true });
  heroParallax();

  const tabs = document.querySelectorAll(".tab");
  const lists = document.querySelectorAll(".menu-list");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.menu;

      tabs.forEach((item) => item.classList.remove("is-active"));
      lists.forEach((list) => list.classList.remove("is-active"));

      tab.classList.add("is-active");
      document.querySelector(`#${target}`)?.classList.add("is-active");
    });
  });

  const form = document.querySelector("form");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Formularz demo — w gotowej stronie można podpiąć go pod mail lub system rezerwacji.");
  });
});
