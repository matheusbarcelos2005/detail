/* ============================================
   AURIX Detailing – interações
   Libs (CDN no index.html):
     Lenis (smooth scroll)
     GSAP + ScrollTrigger (parallax)
     Swiper (carrossel)
   ============================================ */

(() => {
  "use strict";

  /* ---------- 1. SMOOTH SCROLL (Lenis) ---------- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Conecta Lenis ao ScrollTrigger pra parallax acompanhar o smooth-scroll
    if (window.gsap && window.ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
    }
  }

  /* ---------- 2. ÂNCORAS SMOOTH ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -60 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- 3. HEADER SCROLLED + TEMA CLARO/ESCURO ---------- */
  const header = document.getElementById("header");
  const hero = document.getElementById("hero");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Header fica preto sobre branco enquanto a hero (fundo claro) está visível
  if (hero) {
    const themeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          document.body.classList.toggle("theme-light", e.isIntersecting);
        });
      },
      // Hero precisa ocupar pelo menos 35% da viewport para ativar o tema claro
      { threshold: [0, 0.35] }
    );
    themeObs.observe(hero);
  }

  /* ---------- 4. REVEAL ON SCROLL (IntersectionObserver) ---------- */
  // Elementos com classe reveal-* recebem [data-revealed] quando entram na viewport
  const revealEls = document.querySelectorAll(
    ".reveal-fadeInDown, .reveal-fadeInUp, .reveal-fadeInLeft, .reveal-fadeInRight, .reveal-slideInUp"
  );

  // No hero e header, reveal imediato (a CSS já trata via tag específica)
  const immediateContainers = ["header.site-header", ".hero"];
  revealEls.forEach((el) => {
    const isImmediate = immediateContainers.some((sel) => el.closest(sel));
    if (isImmediate) {
      el.setAttribute("data-revealed", "");
    } else {
      el.classList.add("invisible-until-reveal");
    }
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("invisible-until-reveal");
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => {
    if (!el.hasAttribute("data-revealed")) io.observe(el);
  });

  /* ---------- 5. PARALLAX (GSAP + ScrollTrigger) ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll("[data-parallax-y]").forEach((el) => {
      const y = parseFloat(el.dataset.parallaxY) || 0;
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    document.querySelectorAll("[data-parallax-x]").forEach((el) => {
      const x = parseFloat(el.dataset.parallaxX) || 0;
      gsap.fromTo(
        el,
        { x: 0 },
        {
          x,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    // Garante recalculo após carregamento de imagens
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  /* ---------- 6. SWIPER (Depoimentos) ---------- */
  if (window.Swiper) {
    new Swiper(".testimonials-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      speed: 500,
      autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".tsm-next",
        prevEl: ".tsm-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 16 },
        1024: { slidesPerView: 3, spaceBetween: 16 },
      },
    });
  }

  /* ---------- 7. FAQ ACCORDION ---------- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");

      // Comportamento "1 aberto por vez"
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
        }
      });

      item.classList.toggle("is-open", willOpen);
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });

  /* ---------- 8. ANO DINÂMICO NO FOOTER ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
