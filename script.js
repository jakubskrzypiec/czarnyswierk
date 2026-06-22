document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".preloader");
  document.body.classList.add("is-loading");

  setTimeout(() => {
    preloader?.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
  }, 2450);

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

  const header = document.querySelector(".site-header");
  let lastY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (!header) return;

    const y = window.scrollY;
    if (y > lastY && y > 120) {
      header.style.transform = "translateX(-50%) translateY(-140%)";
      header.style.opacity = "0";
    } else {
      header.style.transform = "translateX(-50%) translateY(0)";
      header.style.opacity = "1";
    }
    lastY = Math.max(y, 0);
  }, { passive: true });

  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabs.forEach((item) => item.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");
      document.querySelector(`#${target}`)?.classList.add("active");
    });
  });

  const gallery = document.querySelector(".horizontal-gallery");
  const track = document.querySelector("#galleryTrack");

  const updateGallery = () => {
    if (!gallery || !track || window.innerWidth <= 680) return;

    const rect = gallery.getBoundingClientRect();
    const total = gallery.offsetHeight - window.innerHeight;
    const progress = Math.min(Math.max(-rect.top / total, 0), 1);
    const distance = track.scrollWidth - window.innerWidth + 160;

    track.style.transform = `translateX(${-distance * progress}px)`;
  };

  window.addEventListener("scroll", updateGallery, { passive: true });
  window.addEventListener("resize", updateGallery);
  updateGallery();

  const cursor = document.querySelector(".cursor-dot");

  if (cursor && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", (event) => {
      cursor.style.opacity = "1";
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });

    document.querySelectorAll("a, button").forEach((item) => {
      item.addEventListener("mouseenter", () => {
        cursor.style.width = "44px";
        cursor.style.height = "44px";
      });

      item.addEventListener("mouseleave", () => {
        cursor.style.width = "18px";
        cursor.style.height = "18px";
      });
    });
  }

  const form = document.querySelector("form");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Rezerwacja demo — w gotowej stronie formularz można podpiąć pod mail lub system rezerwacji.");
  });
});
