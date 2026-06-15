const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#nav");
const year = document.querySelector("#year");
const revealElements = document.querySelectorAll(".reveal");
const sectionAnchors = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav__link");

if (year) year.textContent = String(new Date().getFullYear());

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const clickInsideNav = nav.contains(event.target);
    const clickOnToggle = toggle.contains(event.target);

    if (!clickInsideNav && !clickOnToggle) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

if ("IntersectionObserver" in window && sectionAnchors.length > 0 && navLinks.length > 0) {
  const navMap = new Map(
    Array.from(navLinks).map((link) => [link.getAttribute("href")?.slice(1), link])
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeLink = navMap.get(entry.target.id);
        if (!activeLink) return;

        navLinks.forEach((link) => link.classList.remove("is-active"));
        activeLink.classList.add("is-active");
      });
    },
    { threshold: 0.42 }
  );

  sectionAnchors.forEach((section) => sectionObserver.observe(section));
}
