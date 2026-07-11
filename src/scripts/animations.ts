// ============================================================
// Cibele — camada de interação
// Sem bibliotecas: reveals via IntersectionObserver + CSS,
// estado do cabeçalho ao rolar e menu mobile acessível.
// ============================================================

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --------------------------------------------------------
   Reveals: o CSS cuida do movimento; o JS apenas marca
   a entrada no viewport. Grupos recebem stagger via --d.
-------------------------------------------------------- */
function initReveals() {
  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.documentElement.classList.remove('is-animate');
    return;
  }

  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item, index) => {
      item.style.setProperty('--d', `${index * 80}ms`);
    });
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------
   Cabeçalho: fundo ao rolar + esconde na descida.
-------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 32);
    header.classList.toggle('is-hidden', y > lastY && y > 400 && !document.body.classList.contains('menu-open'));
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------
   Menu mobile.
-------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;

  let open = false;

  const setOpen = (state: boolean) => {
    open = state;
    toggle.setAttribute('aria-expanded', String(state));
    toggle.setAttribute('aria-label', state ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', state);
    if (state) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
    } else {
      menu.classList.remove('is-open');
      const done = () => {
        menu.hidden = true;
        menu.removeEventListener('transitionend', done);
      };
      if (reduceMotion) done();
      else menu.addEventListener('transitionend', done);
    }
  };

  toggle.addEventListener('click', () => setOpen(!open));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* --------------------------------------------------------
   Boot.
-------------------------------------------------------- */
function boot() {
  initHeader();
  initMobileMenu();
  initReveals();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
