import { useRef, useState } from 'react';
import { gsap, useGSAP, lenis, signalIntro, prefersReducedMotion } from '../gsap.js';
import logoSvg from '../assets/logo-dark.svg?raw';
import './Preloader.css';

const MIN_DURATION = 2; // seconds the progress line takes, even on a warm cache

export default function Preloader() {
  const root = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      lenis.stop();

      const q = gsap.utils.selector(root);
      const [igs, band, words] = q('.loader__logo path');
      const pct = q('.loader__pct')[0];
      const progress = { v: 0 };

      const finish = () => {
        lenis.start();
        setDone(true);
      };

      if (prefersReducedMotion()) {
        signalIntro();
        gsap.to(root.current, { opacity: 0, duration: 0.4, delay: 0.3, onComplete: finish });
        return;
      }

      gsap.set(igs, { yPercent: 30, opacity: 0 });
      gsap.set(band, { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set(words, { opacity: 0 });
      gsap.set(q('.loader__progress'), { opacity: 0 });

      // logo assembles: wordmark rises, band sweeps in, lettering settles
      const intro = gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(igs, { yPercent: 0, opacity: 1, duration: 1 }, 0.1)
        .to(band, { scaleX: 1, duration: 0.9, ease: 'expo.inOut' }, 0.45)
        .to(words, { opacity: 1, duration: 0.6 }, 1)
        .to(q('.loader__progress'), { opacity: 1, duration: 0.6 }, 0.3)
        .to(
          progress,
          {
            v: 100,
            duration: MIN_DURATION,
            ease: 'power2.inOut',
            onUpdate: () => {
              pct.textContent = String(Math.round(progress.v));
              gsap.set(q('.loader__fill'), { scaleX: progress.v / 100 });
            }
          },
          0.3
        );

      // leave only once both the progress and the webfonts are done
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      Promise.all([fontsReady, new Promise(r => intro.eventCallback('onComplete', r))]).then(() => {
        gsap
          .timeline({ onComplete: finish })
          .to(q('.loader__progress'), { opacity: 0, duration: 0.35, ease: 'power2.in' })
          .to(q('.loader__logo'), { opacity: 0, scale: 0.96, duration: 0.5, ease: 'power2.in' }, '-=0.15')
          .add(signalIntro, '-=0.1')
          .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' }, '-=0.15');
      });
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__inner">
        <div className="loader__logo" dangerouslySetInnerHTML={{ __html: logoSvg }} />
        <div className="loader__progress">
          <span className="loader__track">
            <span className="loader__fill" />
          </span>
          <span className="loader__pct">0</span>
        </div>
      </div>
    </div>
  );
}
