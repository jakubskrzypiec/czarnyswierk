document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  document.body.classList.add("is-loading");

  setTimeout(() => {
    loader?.classList.add("is-hidden");
    document.body.classList.remove("is-loading");
  }, 2350);

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

    const currentY = window.scrollY;

    if (currentY > lastY && currentY > 140) {
      header.style.transform = "translateX(-50%) translateY(-140%)";
      header.style.opacity = "0";
    } else {
      header.style.transform = "translateX(-50%) translateY(0)";
      header.style.opacity = "1";
    }

    lastY = Math.max(currentY, 0);
  }, { passive: true });

  const heroBg = document.querySelector(".hero-bg img");

  const updateHeroParallax = () => {
    if (!heroBg) return;
    const y = Math.min(window.scrollY, window.innerHeight);
    heroBg.style.transform = `scale(1.04) translateY(${y * 0.12}px)`;
  };

  window.addEventListener("scroll", updateHeroParallax, { passive: true });
  updateHeroParallax();

  const tabs = document.querySelectorAll(".tab");
  const menuLists = document.querySelectorAll(".menu-list");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;

      tabs.forEach((item) => item.classList.remove("active"));
      menuLists.forEach((list) => list.classList.remove("active"));

      tab.classList.add("active");
      document.querySelector(`#${target}`)?.classList.add("active");
    });
  });

  const pathSection = document.querySelector(".forest-path");
  const pathOrbit = document.querySelector("#pathOrbit");
  const pathCopy = document.querySelector(".path-copy");

  const updatePath = () => {
    if (!pathSection || !pathOrbit || !pathCopy || window.innerWidth <= 700) return;

    const rect = pathSection.getBoundingClientRect();
    const total = pathSection.offsetHeight - window.innerHeight;
    const progress = Math.min(Math.max(-rect.top / total, 0), 1);
    const rotate = progress * 260;
    const scale = 0.82 + progress * 1.25;
    const shift = 18 - progress * 18;

    pathOrbit.style.transform = `translateX(${shift}vw) rotate(${rotate}deg) scale(${scale})`;
    pathCopy.style.opacity = Math.max(0.25, 1 - progress * 1.45);
    pathCopy.style.transform = `translateY(${-progress * 36}px)`;
  };

  window.addEventListener("scroll", updatePath, { passive: true });
  window.addEventListener("resize", updatePath);
  updatePath();

  const gallery = document.querySelector(".gallery");
  const track = document.querySelector("#galleryTrack");

  const updateGallery = () => {
    if (!gallery || !track || window.innerWidth <= 700) return;

    const rect = gallery.getBoundingClientRect();
    const start = window.innerHeight * 0.75;
    const progress = Math.min(Math.max((start - rect.top) / (gallery.offsetHeight * 0.62), 0), 1);
    const distance = track.scrollWidth - window.innerWidth + 120;

    track.style.transform = `translateX(${-distance * progress}px)`;
  };

  window.addEventListener("scroll", updateGallery, { passive: true });
  window.addEventListener("resize", updateGallery);
  updateGallery();

  const tiltItems = document.querySelectorAll("[data-tilt]");

  tiltItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      item.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  });

  const form = document.querySelector("form");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Formularz demo — w finalnej wersji można go podpiąć pod mail lub system rezerwacji.");
  });
});
