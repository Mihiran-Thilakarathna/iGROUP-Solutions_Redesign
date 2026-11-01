import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '../gsap.js';

// soft drifting light pools behind the whole page; top is a % of the page height
const GLOWS = [
  { top: 9, x: 88, size: 1.15, color: 1, drift: 'a', dur: 28, delay: 0 },
  { top: 20, x: 6, size: 1.35, color: 3, drift: 'b', dur: 34, delay: -5 },
  { top: 33, x: 72, size: 1.1, color: 2, drift: 'c', dur: 26, delay: -10 },
  { top: 45, x: 12, size: 1, color: 1, drift: 'a', dur: 30, delay: -15 },
  { top: 55, x: 84, size: 1.4, color: 4, drift: 'c', dur: 22, delay: -20 },
  { top: 66, x: 18, size: 1.4, color: 3, drift: 'b', dur: 32, delay: -25 },
  { top: 80, x: 90, size: 1.2, color: 1, drift: 'a', dur: 27, delay: -30 },
  { top: 93, x: 50, size: 1.5, color: 2, drift: 'c', dur: 24, delay: -35 }
];

export default function PageGlows() {
  const root = useRef(null);

  // only animate the pools that are near the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => (e.target.dataset.active = e.isIntersecting)),
      { rootMargin: '30% 0px' }
    );
    root.current.querySelectorAll('.glow-anchor').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // light parallax so the pools move at a different pace than the content
  useGSAP(
    () => {
      gsap.utils.toArray('.glow-anchor').forEach((el, i) => {
        gsap.fromTo(
          el,
          { yPercent: i % 2 ? -20 : 20 },
          {
            yPercent: i % 2 ? 20 : -20,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <div className="page-glows" ref={root} aria-hidden="true">
      {GLOWS.map((g, i) => (
        <div key={i} className="glow-anchor" style={{ top: `${g.top}%`, '--gx': `${g.x}%`, '--gs': g.size }}>
          <div
            className={`glow glow-drift-${g.drift}`}
            style={{ '--gc': `var(--glow-${g.color})`, animationDuration: `${g.dur}s`, animationDelay: `${g.delay}s` }}
          />
        </div>
      ))}
    </div>
  );
}
