// Follow the system theme until the visitor explicitly chooses one.
const themeToggle = document.querySelector('.theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let explicitTheme = null;

try {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light' || saved === 'dark') explicitTheme = saved;
} catch {
  // Continue with an in-memory preference if storage is blocked.
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content', theme === 'dark' ? '#111c19' : '#f7f8f2'
  );
}

applyTheme(explicitTheme || (systemTheme.matches ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.hidden = false;
  themeToggle.addEventListener('click', () => {
    explicitTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(explicitTheme);
    try {
      localStorage.setItem('portfolio-theme', explicitTheme);
    } catch {
      // The control still works without persistence.
    }
  });
}

systemTheme.addEventListener('change', (event) => {
  if (!explicitTheme) applyTheme(event.matches ? 'dark' : 'light');
});

// Navigation remains available without JavaScript.
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');

if (nav && toggle && links) {
  const setMenuOpen = (open) => {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  links.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(false);
    // Move keyboard focus out of the hidden menu on same-page navigation.
    if (wasOpen && link.hash && link.pathname === location.pathname) {
      const target = document.getElementById(link.hash.slice(1));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) setMenuOpen(false);
  });

  nav.addEventListener('focusout', (event) => {
    if (!nav.contains(event.relatedTarget)) setMenuOpen(false);
  });

  const mobileViewport = matchMedia('(max-width: 760px)');
  mobileViewport.addEventListener('change', () => {
    const focusWasInMenu = links.contains(document.activeElement);
    setMenuOpen(false);
    if (focusWasInMenu && mobileViewport.matches) toggle.focus();
  });

  nav.classList.add('nav--interactive');
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mark the section at the reading position without hiding any content.
const sections = [...document.querySelectorAll('main > section[id]')];
const sectionLinks = [...document.querySelectorAll('.nav__links a[href^="#"]')];
if (sections.length && sectionLinks.length) {
  let scheduled = false;
  const updateCurrentSection = () => {
    const readingLine = (document.querySelector('.site-header')?.offsetHeight || 88) + 90;
    let current = '';
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= readingLine) current = section.id;
    }
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1].id;
    }
    sectionLinks.forEach((link) => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };
  const scheduleUpdate = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateCurrentSection);
    }
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateCurrentSection();
}