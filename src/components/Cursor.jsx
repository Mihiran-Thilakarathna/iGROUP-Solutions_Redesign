import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../gsap.js';
import './Cursor.css';

const INTERACTIVE = 'a, button, [role="button"], label, .svc-row, .logoloop__item';
const TEXT = 'input, textarea, [contenteditable="true"]';

// a precise dot with a trailing ring, only for mouse/trackpad users
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const lag = prefersReducedMotion() ? 0.01 : 0.18;
    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' });
    const ringX = gsap.quickTo(ring.current, 'x', { duration: lag * 3, ease: 'power3' });
    const ringY = gsap.quickTo(ring.current, 'y', { duration: lag * 3, ease: 'power3' });
    let shown = false;

    const set = (name, on) => root.classList.toggle(name, on);

    const onMove = e => {
      if (!shown) {
        // first sighting: jump straight to the pointer instead of sliding in from a corner
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        shown = true;
      }
      set('cursor-visible', true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      const t = e.target instanceof Element ? e.target : null;
      set('cursor-text', !!t?.closest(TEXT));
      set('cursor-hover', !!t?.closest(INTERACTIVE) && !t?.closest(TEXT));
    };
    const onLeave = () => set('cursor-visible', false);
    const onDown = () => set('cursor-down', true);
    const onUp = () => set('cursor-down', false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      ['has-cursor', 'cursor-visible', 'cursor-hover', 'cursor-text', 'cursor-down'].forEach(c => set(c, false));
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__ring" ref={ring}>
        <span />
      </div>
      <div className="cursor__dot" ref={dot}>
        <span />
      </div>
    </div>
  );
}
