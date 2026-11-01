import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
export const lenis = new Lenis({
  duration: 1.15,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: !prefersReducedMotion()
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

export function scrollToSection(id) {
  lenis.scrollTo(id === 'home' ? 0 : `#${id}`, {
    offset: id === 'home' ? 0 : -72,
    duration: prefersReducedMotion() ? 0 : 1.4
  });
}

// the preloader resolves this the moment it starts leaving, so the hero can take over
let resolveIntro;
export const introReady = new Promise(r => (resolveIntro = r));
export const signalIntro = () => resolveIntro();

export { gsap, ScrollTrigger, SplitText, useGSAP };
