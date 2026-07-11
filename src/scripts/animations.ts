// ============================================================
// Cibele Plastic — Motor de animações (Anime.js v4)
// Reveals de scroll, títulos em linhas, contadores, cursor,
// botões magnéticos, timeline do hero e menu mobile.
// ============================================================
import { animate, createTimeline, stagger, utils } from 'animejs';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;

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
            translateY: [38, 0],
            duration: 900,
            delay: stagger(90),
            ease: 'outExpo',
          });
        } else if (el.hasAttribute('data-lines')) {
          animate(el.querySelectorAll<HTMLElement>('.line-inner'), {
            translateY: ['110%', '0%'],
            duration: 1100,
            delay: stagger(90),
            ease: 'outExpo',
          });
        } else {
          const distance = el.getAttribute('data-reveal') === 'fade' ? 0 : 38;
          animate(el, {
            opacity: [0, 1],
            translateY: [distance, 0],
            duration: 950,
            ease: 'outExpo',
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
   Contadores numéricos.
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
          duration: 2000,
          ease: 'outExpo',
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
    defaults: { ease: 'outExpo', duration: 1150 },
  });

  const lines = hero.querySelectorAll<HTMLElement>('.line-inner');
  if (lines.length) {
    tl.add(lines, {
      translateY: ['115%', '0%'],
      delay: stagger(110),
    });
  }

  hero.querySelectorAll<HTMLElement>('[data-hero-item]').forEach((item, index) => {
    tl.add(
      item,
      {
        opacity: [0, 1],
        translateY: [26, 0],
        duration: 900,
      },
      index === 0 ? '-=650' : '-=750',
    );
  });
}

/* --------------------------------------------------------
   Botões magnéticos.
-------------------------------------------------------- */
function initMagnetic() {
  if (!fine) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic || '0.3');
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      animate(el, {
        translateX: x * strength,
        translateY: y * strength,
        duration: 500,
        ease: 'outQuart',
      });
    });
    el.addEventListener('mouseleave', () => {
      animate(el, {
        translateX: 0,
        translateY: 0,
        duration: 700,
        ease: 'outElastic(1, 0.4)',
      });
    });
  });
}

/* --------------------------------------------------------
   Cursor personalizado.
-------------------------------------------------------- */
function initCursor() {
  if (!fine) return;

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.append(ring, dot);

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { ...pos };
  let visible = false;

  window.addEventListener('mousemove', (event) => {
    pos.x = event.clientX;
    pos.y = event.clientY;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    if (!visible) {
      visible = true;
      document.body.classList.add('has-cursor');
    }
  });

  const render = () => {
    ringPos.x += (pos.x - ringPos.x) * 0.18;
    ringPos.y += (pos.y - ringPos.y) * 0.18;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  const hoverables = 'a, button, [data-cursor], input, textarea, .segment';
  document.querySelectorAll(hoverables).forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
  });

  window.addEventListener('mouseleave', () => document.body.classList.remove('has-cursor'));
  window.addEventListener('mouseenter', () => document.body.classList.add('has-cursor'));
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
        animate(panel, { opacity: [0, 1], translateY: [-8, 0], duration: 400, ease: 'outQuad' });
      }
    } else if (!reduceMotion) {
      animate(panel, {
        opacity: [1, 0],
        translateY: [0, -8],
        duration: 250,
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
      animate(menu, { opacity: [0, 1], duration: 400, ease: 'outQuad' });
      if (!reduceMotion) {
        animate(links, {
          opacity: [0, 1],
          translateY: [30, 0],
          delay: stagger(70, { start: 120 }),
          duration: 700,
          ease: 'outExpo',
        });
      }
    } else {
      animate(menu, {
        opacity: [1, 0],
        duration: 350,
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
          scale: [1, 0.94, 1],
          duration: 450,
          ease: 'outBack',
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
   Alternância de tema (claro / escuro).
   O tema inicial já é aplicado por um script inline no <head>
   (antes da pintura); aqui só tratamos o clique e a persistência.
-------------------------------------------------------- */
function initThemeToggle() {
  const root = document.documentElement;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  const toggles = document.querySelectorAll<HTMLElement>('[data-theme-toggle]');

  const apply = (theme: 'light' | 'dark') => {
    root.setAttribute('data-theme', theme);
    if (meta) meta.content = theme === 'dark' ? '#0e1410' : '#f8f3e6';
    toggles.forEach((btn) =>
      btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'),
    );
    try {
      localStorage.setItem('cibele-theme', theme);
    } catch (e) {
      /* localStorage indisponível — segue sem persistir */
    }
  };

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      apply(current === 'dark' ? 'light' : 'dark');
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
    window.setTimeout(() => (banner.hidden = true), 600);
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
  initThemeToggle();
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
  initMagnetic();
  initCursor();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
