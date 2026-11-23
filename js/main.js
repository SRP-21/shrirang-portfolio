/**
 * Portfolio Site — Main JavaScript
 * Vanilla JS, no dependencies. Handles all interactivity.
 */
(() => {
  'use strict';

  /* -------------------------------------------------- */
  /*  Utilities                                          */
  /* -------------------------------------------------- */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /** True when the user prefers reduced motion. */
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Throttle via requestAnimationFrame. */
  const rafThrottle = (fn) => {
    let ticking = false;
    return (...args) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        fn(...args);
        ticking = false;
      });
    };
  };

  /* -------------------------------------------------- */
  /*  1. Header Scroll Effect                            */
  /* -------------------------------------------------- */

  const initHeaderScroll = () => {
    const header = $('header');
    if (!header) return;

    const onScroll = rafThrottle(() => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
  };

  /* -------------------------------------------------- */
  /*  2. Mobile Menu                                     */
  /* -------------------------------------------------- */

  let mobileMenuOpen = false;

  const openMobileMenu = (toggle, menu) => {
    mobileMenuOpen = true;
    menu.classList.add('mobile-menu--open', 'active');
    toggle.classList.add('nav-toggle--open', 'active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    document.body.style.overflow = 'hidden';
    // Move focus into the menu
    const firstLink = $('a', menu);
    if (firstLink) firstLink.focus();
  };

  const closeMobileMenu = (toggle, menu) => {
    if (!mobileMenuOpen) return;
    mobileMenuOpen = false;
    menu.classList.remove('mobile-menu--open', 'active');
    toggle.classList.remove('nav-toggle--open', 'active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    document.body.style.overflow = '';
    toggle.focus();
  };

  const initMobileMenu = () => {
    const toggle = $('.nav-toggle');
    const menu = $('.mobile-menu');
    if (!toggle || !menu) return;

    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', () => {
      mobileMenuOpen ? closeMobileMenu(toggle, menu) : openMobileMenu(toggle, menu);
    });

    // Close when a nav link inside is clicked
    $$('a', menu).forEach((link) => {
      link.addEventListener('click', () => closeMobileMenu(toggle, menu));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) closeMobileMenu(toggle, menu);
    });

    // Simple focus trap inside the menu
    menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !mobileMenuOpen) return;
      const focusable = $$('a, button, [tabindex]:not([tabindex="-1"])', menu);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  };

  /* -------------------------------------------------- */
  /*  3. Smooth Scroll                                   */
  /* -------------------------------------------------- */

  const HEADER_OFFSET = 80;

  const initSmoothScroll = () => {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = $(id);
        if (!target) return;

        e.preventDefault();

        // Close mobile menu if it's open
        const toggle = $('.nav-toggle');
        const menu = $('.mobile-menu');
        if (toggle && menu && mobileMenuOpen) closeMobileMenu(toggle, menu);

        const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      });
    });
  };

  /* -------------------------------------------------- */
  /*  4. Scroll Fade-In Animations                       */
  /* -------------------------------------------------- */

  const initFadeIn = () => {
    const items = $$('.fade-in');
    if (!items.length) return;

    // Respect reduced-motion preference — reveal everything immediately
    if (prefersReducedMotion()) {
      items.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((el) => observer.observe(el));
  };

  /* -------------------------------------------------- */
  /*  5. Lightbox                                        */
  /* -------------------------------------------------- */

  let lightboxOpen = false;
  let currentIndex = 0;
  let galleryItems = [];

  const showLightbox = (index) => {
    const lightbox = $('#lightbox');
    if (!lightbox || !galleryItems.length) return;

    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIndex];
    const img = $('.lightbox__img', lightbox);
    const caption = $('.lightbox__caption', lightbox);

    const imgEl = item.tagName === 'IMG' ? item : item.querySelector('img');
    const fullSrc = item.getAttribute('data-full') || item.getAttribute('data-src') || (imgEl ? imgEl.getAttribute('src') : '') || item.src || '';
    const altText = (imgEl ? imgEl.getAttribute('alt') : '') || item.alt || '';
    const captionText = item.getAttribute('data-caption') || altText;

    if (img) {
      img.src = fullSrc;
      img.alt = altText;
    }
    if (caption) {
      caption.textContent = captionText;
    }

    lightbox.classList.add('lightbox--open', 'active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    document.body.style.overflow = 'hidden';
    lightboxOpen = true;

    // Focus the close button for accessibility
    const closeBtn = $('.lightbox__close', lightbox);
    if (closeBtn) closeBtn.focus();
  };

  const hideLightbox = () => {
    const lightbox = $('#lightbox');
    if (!lightbox) return;

    lightbox.classList.remove('lightbox--open', 'active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    document.body.style.overflow = '';
    lightboxOpen = false;

    // Return focus to the gallery item that opened the lightbox
    if (galleryItems[currentIndex]) galleryItems[currentIndex].focus();
  };

  const initLightbox = () => {
    const lightbox = $('#lightbox');
    if (!lightbox) return;

    galleryItems = $$('.gallery-item');
    if (!galleryItems.length) return;

    lightbox.setAttribute('aria-hidden', 'true');

    // Open lightbox on gallery item click
    galleryItems.forEach((item, i) => {
      item.style.cursor = 'pointer';
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');

      const open = () => showLightbox(i);
      item.addEventListener('click', open);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });

    // Navigation buttons
    const prevBtn = $('.lightbox__prev', lightbox);
    const nextBtn = $('.lightbox__next', lightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => showLightbox(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showLightbox(currentIndex + 1));

    // Close button
    const closeBtn = $('.lightbox__close', lightbox);
    if (closeBtn) closeBtn.addEventListener('click', hideLightbox);

    // Close on overlay click (not on inner elements)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) hideLightbox();
    });

    // Keyboard navigation & close
    document.addEventListener('keydown', (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') hideLightbox();
      if (e.key === 'ArrowLeft') showLightbox(currentIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(currentIndex + 1);
    });

    // Focus trap inside lightbox
    lightbox.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !lightboxOpen) return;
      const focusable = $$('button, [tabindex]:not([tabindex="-1"])', lightbox);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  };

  /* -------------------------------------------------- */
  /*  6. Active Nav Highlighting                         */
  /* -------------------------------------------------- */

  const initActiveNav = () => {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle(
                'nav-link--active',
                link.getAttribute('href') === `#${id}`
              );
            });
          }
        });
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -40% 0px`, threshold: 0.1 }
    );

    sections.forEach((s) => observer.observe(s));
  };

  /* -------------------------------------------------- */
  /*  7. Reel Cards                                      */
  /* -------------------------------------------------- */

  const initReelCards = () => {
    const cards = $$('.reel-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      const url = card.getAttribute('data-url');
      if (!url) return;

      card.style.cursor = 'pointer';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');

      const handleOpen = () => {
        if (url === '[REEL LINK]') {
          // Show a subtle tooltip message
          let tip = $('.reel-card__tip', card);
          if (!tip) {
            tip = document.createElement('span');
            tip.className = 'reel-card__tip';
            tip.textContent = 'Link coming soon';
            tip.setAttribute('role', 'status');
            card.appendChild(tip);
          }
          tip.classList.add('reel-card__tip--visible');
          setTimeout(() => tip.classList.remove('reel-card__tip--visible'), 2000);
        } else {
          window.open(url, '_blank', 'noopener');
        }
      };

      card.addEventListener('click', handleOpen);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpen(); }
      });
    });
  };

  /* -------------------------------------------------- */
  /*  8. Initialization                                  */
  /* -------------------------------------------------- */

  const init = () => {
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initFadeIn();
    initLightbox();
    initActiveNav();
    initReelCards();

    // Signal that JS has loaded
    document.body.classList.add('loaded');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
