(function () {
  "use strict";

  // ---- Hamburger toggle ----
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = mobileNav.classList.toggle("open");
      hamburger.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("click", function (e) {
      const header = document.querySelector(".site-header");
      if (header && !header.contains(e.target)) {
        mobileNav.classList.remove("open");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  // ---- Header scroll shadow ----
  const header = document.querySelector(".site-header");
  if (header) {
    let scrollTimeout;
    window.addEventListener(
      "scroll",
      function () {
        if (scrollTimeout) return;
        scrollTimeout = requestAnimationFrame(function () {
          if (window.scrollY > 20) {
            header.classList.add("scrolled");
          } else {
            header.classList.remove("scrolled");
          }
          scrollTimeout = null;
        });
      },
      { passive: true },
    );
  }

  // ---- FAQ Toggle: + ↔ × ----
  document.querySelectorAll(".faq-item").forEach(function (details) {
    const summary = details.querySelector(".faq-question");
    const icon = summary.querySelector(".faq-icon");

    function updateIcon() {
      if (details.open) {
        icon.textContent = "×";
      } else {
        icon.textContent = "+";
      }
    }

    details.addEventListener("toggle", function () {
      updateIcon();
    });

    summary.addEventListener("click", function (e) {
      setTimeout(updateIcon, 10);
    });

    updateIcon();
  });

  // ---- Smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight =
          document.querySelector(".site-header")?.offsetHeight || 72;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          12;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ---- Scroll-triggered fade-in (Intersection Observer) ----
  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
