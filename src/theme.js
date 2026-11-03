import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

// the attributes are set before first paint by the inline script in index.html
const KEY = 'igs-theme';
const BG = { dark: '#050505', light: '#ece3d4' };
const REVEAL_MS = 1000;
const listeners = new Set();

export const getTheme = () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

// the scrollbar has its own attribute: it sits outside the view-transition snapshot, so it
// would otherwise flip to the new theme before the reveal has even started
function setScrollbar(theme) {
  document.documentElement.dataset.scrollbar = theme;
}

function apply(theme, { scrollbar = true } = {}) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  if (scrollbar) setScrollbar(theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BG[theme]);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // private mode / blocked storage: the choice just won't outlive the tab
  }
  listeners.forEach(fn => fn());
}

const subscribe = fn => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const useTheme = () => useSyncExternalStore(subscribe, getTheme, () => 'dark');

// inverse of cubic-bezier(0.65, 0, 0.35, 1) — easeInOutCubic — : time at which progress p is reached
const timeAt = p => (p < 0.5 ? Math.cbrt(p / 4) : 1 - Math.cbrt(2 * (1 - p)) / 2);

/**
 * Flip the theme. With View Transitions the new theme washes out from `origin` (the toggle)
 * as a soft-edged circle; without them every colour eases across in place.
 */
export function toggleTheme(origin) {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  const root = document.documentElement;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    apply(next);
    return;
  }
  if (!document.startViewTransition) {
    root.classList.add('theme-fading');
    apply(next);
    setTimeout(() => root.classList.remove('theme-fading'), 550);
    return;
  }

  const w = root.clientWidth; // the snapshot area, scrollbar excluded
  const h = window.innerHeight;
  const x = origin?.x ?? w - 40;
  const y = origin?.y ?? 40;
  // a wide, soft edge reads as light spreading rather than a shape being cut out
  const feather = Math.round(Math.max(160, Math.hypot(w, h) * 0.16));
  const end = Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + feather;
  // the scrollbar flips as the middle of the soft edge sweeps past the far end of the right edge
  const edge = Math.hypot(w - x, Math.max(y, h - y));
  const scrollbarAt = timeAt(Math.min(1, (edge + feather / 2) / end)) * REVEAL_MS;
  root.dataset.themeSwitch = next;
  root.style.setProperty('--reveal-x', `${x}px`);
  root.style.setProperty('--reveal-y', `${y}px`);
  root.style.setProperty('--reveal-feather', `${feather}px`);

  // React must commit inside the callback, or the "after" snapshot would still show the old theme
  const transition = document.startViewTransition(() => flushSync(() => apply(next, { scrollbar: false })));
  let scrollbarTimer;
  transition.ready
    .then(() => {
      root.animate(
        { '--reveal': ['0px', `${end}px`] },
        { duration: REVEAL_MS, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards', pseudoElement: '::view-transition-new(root)' }
      );
      scrollbarTimer = setTimeout(() => setScrollbar(next), scrollbarAt);
    })
    .catch(() => {});
  // a throttled tab (backgrounded mid-switch) must never be left showing a frozen snapshot
  const bail = setTimeout(() => transition.skipTransition(), REVEAL_MS * 2);
  transition.finished.finally(() => {
    clearTimeout(bail);
    clearTimeout(scrollbarTimer);
    setScrollbar(next);
    delete root.dataset.themeSwitch;
    ['--reveal-x', '--reveal-y', '--reveal-feather'].forEach(p => root.style.removeProperty(p));
  });
}
