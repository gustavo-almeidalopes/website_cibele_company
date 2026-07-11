// ============================================================
// Cibele Plastic — Motor de animações (Anime.js v4)
// Vocabulário restrito: fade, opacity, translateY e scale sutil,
// 200-250ms, sem bounce/elastic/movimento contínuo.
// ============================================================
import { animate, createTimeline, stagger, utils } from 'animejs';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;

const DURATION = 240;
const DURATION_FAST = 200;
const EASE = 'outQuart';

/* --------------------------------------------------------
   Fallback sem movimento: apenas mostra tudo.
-------------------------------------------------------- */
function showEverything() {
  document.documentElement.classList.remove('is-animate');
  utils.set('[data-reveal], [data-reveal-item], .line-inner', {
    opacity: 1,
    translateY: 0,
  });
}

/* --------------------------------------------------------
   Reveal de elementos e grupos via IntersectionObserver.
-------------------------------------------------------- */
function initReveals() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        obs.unobserve(el);

        if (el.hasAttribute('data-reveal-group')) {
          const items = el.querySelectorAll<HTMLElement>('[data-reveal-item]');
          animate(items, {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: DURATION,
            delay: stagger(45),
            ease: EASE,
          });
        } else if (el.hasAttribute('data-lines')) {
          animate(el.querySelectorAll<HTMLElement>('.line-inner'), {
            translateY: ['105%', '0%'],
            duration: DURATION,
            delay: stagger(45),
            ease: EASE,
          });
        } else {
          const distance = el.getAttribute('data-reveal') === 'fade' ? 0 : 16;
          animate(el, {
            opacity: [0, 1],
            translateY: [distance, 0],
            duration: DURATION,
            ease: EASE,
          });
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  document
    .querySelectorAll('[data-reveal], [data-reveal-group], [data-lines]')
    .forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------
   Contadores numéricos (conteúdo, não transform — mantém
   duração própria para permanecer legível).
-------------------------------------------------------- */
function initCounters() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        obs.unobserve(el);
        const target = Number(el.dataset.count ?? '0');
        const proxy = { value: 0 };
        animate(proxy, {
          value: target,
          duration: 1100,
          ease: 'outQuart',
          onUpdate: () => {
            el.textContent = String(Math.round(proxy.value));
          },
        });
      }
    },
    { threshold: 0.4 },
  );

  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------
   Timeline do hero (executa no carregamento).
-------------------------------------------------------- */
function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const tl = createTimeline({
    defaults: { ease: EASE, duration: DURATION },
  });

  const lines = hero.querySelectorAll<HTMLElement>('.line-inner');
  if (lines.length) {
    tl.add(lines, {
      translateY: ['105%', '0%'],
      delay: stagger(60),
    });
  }

  hero.querySelectorAll<HTMLElement>('[data-hero-item]').forEach((item, index) => {
    tl.add(
      item,
      {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: DURATION,
      },
      index === 0 ? '-=140' : '-=180',
    );
  });
}

/* --------------------------------------------------------
   Cabeçalho: estado ao rolar + esconde/mostra.
-------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (y > lastY && y > 320) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------
   Mega menu de categorias (desktop) — abre no hover para
   ponteiros finos e por clique/teclado em qualquer caso.
-------------------------------------------------------- */
function initMegaMenu() {
  const wrap = document.querySelector<HTMLElement>('[data-mega-wrap]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-mega-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-mega-panel]');
  if (!wrap || !toggle || !panel) return;

  let open = false;
  let openedByHover = false;
  let hoverTimer = 0;

  const setOpen = (state: boolean, viaHover = false) => {
    if (state === open) return;
    open = state;
    if (state) openedByHover = viaHover;
    toggle.setAttribute('aria-expanded', String(state));
    toggle.classList.toggle('is-open', state);

    if (state) {
      panel.hidden = false;
      if (!reduceMotion) {
        animate(panel, { opacity: [0, 1], translateY: [-6, 0], duration: DURATION_FAST, ease: 'outQuad' });
      }
    } else if (!reduceMotion) {
      animate(panel, {
        opacity: [1, 0],
        translateY: [0, -6],
        duration: DURATION_FAST,
        ease: 'outQuad',
        onComplete: () => {
          panel.hidden = true;
        },
      });
    } else {
      panel.hidden = true;
    }
  };

  // Em ponteiros finos, o hover já abre o menu antes do clique chegar;
  // ignoramos esse clique "de passagem" para não fechar o painel na hora.
  toggle.addEventListener('click', () => {
    if (open && openedByHover) return;
    setOpen(!open);
  });

  if (fine) {
    wrap.addEventListener('mouseenter', () => {
      window.clearTimeout(hoverTimer);
      if (window.innerWidth >= 940) setOpen(true, true);
    });
    wrap.addEventListener('mouseleave', () => {
      hoverTimer = window.setTimeout(() => setOpen(false), 150);
    });
  }

  panel.querySelectorAll('[data-mega-link]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('click', (event) => {
    if (open && !wrap.contains(event.target as Node)) setOpen(false);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (open && window.innerWidth < 940) setOpen(false);
  });
}

/* --------------------------------------------------------
   Menu mobile.
-------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector<HTMLElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;

  const links = menu.querySelectorAll<HTMLElement>('[data-menu-link]');
  let open = false;

  const setOpen = (state: boolean) => {
    open = state;
    toggle.setAttribute('aria-expanded', String(state));
    document.body.classList.toggle('menu-open', state);
    document.documentElement.classList.toggle('menu-open', state);
    if (state) {
      menu.hidden = false;
      animate(menu, { opacity: [0, 1], duration: DURATION_FAST, ease: 'outQuad' });
      if (!reduceMotion) {
        animate(links, {
          opacity: [0, 1],
          translateY: [16, 0],
          delay: stagger(35, { start: 60 }),
          duration: DURATION,
          ease: EASE,
        });
      }
    } else {
      animate(menu, {
        opacity: [1, 0],
        duration: DURATION_FAST,
        ease: 'outQuad',
        onComplete: () => {
          menu.hidden = true;
        },
      });
    }
  };

  toggle.addEventListener('click', () => setOpen(!open));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) setOpen(false);
  });
}

/* --------------------------------------------------------
   Feedback de "Adicionar ao carrinho" (front-end apenas).
-------------------------------------------------------- */
function initAddButtons() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-add]');
  if (!buttons.length) return;

  let toast: HTMLElement | null = null;
  let toastTimer = 0;

  const notify = (name: string) => {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<strong>Adicionado</strong> ${name}`;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast?.classList.remove('is-visible'), 2200);
  };

  buttons.forEach((button) => {
    const label = button.querySelector('.card__add-label');
    const original = label?.textContent ?? 'Adicionar';
    button.addEventListener('click', () => {
      button.classList.add('is-added');
      if (label) label.textContent = 'Adicionado';
      notify(button.dataset.name ?? 'Produto');
      if (!reduceMotion) {
        animate(button, {
          scale: [1, 0.97, 1],
          duration: DURATION,
          ease: 'outQuad',
        });
      }
      window.setTimeout(() => {
        button.classList.remove('is-added');
        if (label) label.textContent = original;
      }, 1600);
    });
  });
}

/* --------------------------------------------------------
   Consentimento de cookies (LGPD).
-------------------------------------------------------- */
function initCookieConsent() {
  const banner = document.getElementById('cookie-consent');
  if (!banner) return;

  const KEY = 'cibele-consent';
  let choice: string | null = null;
  try {
    choice = localStorage.getItem(KEY);
  } catch (e) {
    choice = null;
  }

  const persist = (value: string) => {
    try {
      localStorage.setItem(KEY, value);
      localStorage.setItem(KEY + '-at', new Date().toISOString());
    } catch (e) {
      /* sem persistência */
    }
  };

  const hide = () => {
    banner.classList.remove('is-visible');
    window.setTimeout(() => (banner.hidden = true), 300);
  };

  // "manage" (link) não fecha nem grava — leva à página de privacidade.
  banner.querySelectorAll<HTMLElement>('[data-consent="accept"], [data-consent="reject"]').forEach(
    (btn) => {
      btn.addEventListener('click', () => {
        persist(btn.dataset.consent === 'accept' ? 'all' : 'essential');
        hide();
      });
    },
  );

  if (!choice) {
    banner.hidden = false;
    // força reflow para a transição de entrada rodar
    requestAnimationFrame(() =>
      requestAnimationFrame(() => banner.classList.add('is-visible')),
    );
  }
}

/* --------------------------------------------------------
   Boot.
-------------------------------------------------------- */
function boot() {
  initCookieConsent();
  initHeader();
  initMegaMenu();
  initMobileMenu();
  initAddButtons();

  if (reduceMotion) {
    showEverything();
    return;
  }

  initHero();
  initReveals();
  initCounters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
