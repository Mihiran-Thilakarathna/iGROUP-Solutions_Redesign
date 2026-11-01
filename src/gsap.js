import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// a refresh always lands back on the hero instead of wherever the page was left
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

// reveals replay every time a block comes into view — scrolling down or back up
ScrollTrigger.defaults({ toggleActions: 'play reverse play reverse' });
// the mobile address bar showing/hiding shouldn't re-measure every trigger mid-scroll
ScrollTrigger.config({ ignoreMobileResize: true });

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// touch screens have no hover, so hover-only effects get a scroll-driven stand-in there
export const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

// smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
export const lenis = new Lenis({
  duration: 1.15,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: !prefersReducedMotion()
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// late layout shifts (webfonts re-wrapping text, the logo loop sizing itself) would leave
// triggers lower down the page firing at stale positions — re-measure when the page height moves
if (typeof ResizeObserver !== 'undefined') {
  let lastHeight = 0;
  const remeasure = gsap.delayedCall(0.25, () => ScrollTrigger.refresh()).pause();
  new ResizeObserver(([entry]) => {
    const h = Math.round(entry.contentRect.height);
    if (h === lastHeight) return;
    lastHeight = h;
    remeasure.restart(true);
  }).observe(document.documentElement);
}

// each element reveals on its own as it reaches the viewport (siblings arriving together
// still stagger), and hides again once it leaves so the reveal replays in both directions.
// a single trigger for a whole tall list fires before the lower items are on a phone screen.
export function revealEach(targets, from, { start = 'top 88%', stagger = 0.1, duration = 0.9, ease = 'power3.out' } = {}) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return;
  if (prefersReducedMotion()) return;
  const rest = Object.fromEntries(Object.keys(from).map(k => [k, k === 'opacity' || k === 'scale' ? 1 : 0]));
  gsap.set(els, from);
  const show = batch => gsap.to(batch, { ...rest, duration, ease, stagger, overwrite: true });
  const hide = batch => gsap.to(batch, { ...from, duration: 0.35, ease: 'power2.in', overwrite: true });
  ScrollTrigger.batch(els, { start, end: 'bottom top', onEnter: show, onEnterBack: show, onLeave: hide, onLeaveBack: hide });
}

export function scrollToSection(id) {
  lenis.scrollTo(id === 'home' ? 0 : `#${id}`, {
    offset: id === 'home' ? 0 : -72,
    duration: prefersReducedMotion() ? 0 : 1.4
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
