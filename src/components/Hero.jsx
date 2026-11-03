import { useRef, useState } from 'react';
import { gsap, SplitText, useGSAP, prefersReducedMotion, scrollToSection } from '../gsap.js';
import { HERO } from '../data/content.js';
import Icon from './Icons.jsx';
import MetallicPaint from './reactbits/MetallicPaint.jsx';
import { useTheme } from '../theme.js';
import './Hero.css';

// WebGL2 powers the metallic wordmark; without it the plain title is shown instead
const supportsWebGL2 = () => {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
};

export default function Hero() {
  const root = useRef(null);
  const [metal] = useState(supportsWebGL2);
  // mounted as the intro starts so the metal "pour" plays with the rest of the hero
  const [lit, setLit] = useState(false);
  const light = useTheme() === 'light';

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const nav = document.querySelector('.nav');
      const headline = SplitText.create(q('.hero__headline'), { type: 'words', mask: 'words' });

      // resting state before the intro — applied before first paint
      gsap.set(q('.hero__wordmark'), { opacity: 0, y: 40, scale: 0.96, filter: 'blur(18px)' });
      gsap.set(q('.hero__ring'), { opacity: 0, scale: 0.86 });
      gsap.set(q('.hero__solutions, .hero__grid'), { opacity: 0 });
      gsap.set(headline.words, { yPercent: 120, rotate: 4 });
      gsap.set(q('.hero__reveal, .hero__scroll'), { y: 28, opacity: 0, filter: 'blur(8px)' });
      gsap.set(nav, { y: -40, opacity: 0 });

      const tl = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .to(q('.hero__grid'), { opacity: 1, duration: 2.4, ease: 'power1.inOut' }, 0)
        .to(q('.hero__ring'), { opacity: 1, scale: 1, duration: 2.6, ease: 'expo.out' }, 0.1)
        .to(
          q('.hero__wordmark'),
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'expo.out', clearProps: 'filter' },
          0.25
        )
        .fromTo(
          q('.hero__solutions'),
          { opacity: 0, letterSpacing: '1.2em' },
          { opacity: 1, letterSpacing: '0.62em', duration: 1.8, ease: 'expo.out' },
          0.7
        )
        .to(nav, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }, 0.9)
        .to(headline.words, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.045, ease: 'expo.out' }, 1)
        .to(
          q('.hero__reveal'),
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, stagger: 0.09, ease: 'expo.out', clearProps: 'filter' },
          1.25
        )
        .to(q('.hero__scroll'), { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, clearProps: 'filter' }, 1.7)
        // once lit, the ring breathes slowly instead of chasing the cursor
        .add(() => {
          if (prefersReducedMotion()) return;
          gsap.to(q('.hero__ring-breath'), {
            scale: 1.025,
            opacity: 0.82,
            duration: 5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          });
        });

      // start as soon as the display font is in, so the wordmark never swaps face mid-intro
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      Promise.race([fontsReady, new Promise(r => setTimeout(r, 1200))]).then(() => {
        setLit(true);
        prefersReducedMotion() ? tl.progress(1) : tl.play();
      });

      // leaving the hero: the ring settles back and the copy lifts away
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 }
        })
        .to(q('.hero__ring-scroll'), { scale: 1.1, opacity: 0.4, ease: 'none' }, 0)
        .to(q('.hero__stage'), { yPercent: -30, opacity: 0, ease: 'none' }, 0)
        .to(q('.hero__content'), { y: -60, opacity: 0, ease: 'none' }, 0);
    },
    { scope: root }
  );

  return (
    <section id="home" className="hero" ref={root}>
      <div className="grid-lines hero__grid" aria-hidden="true" />

      <div className="hero__stage">
        <div className="hero__ring-scroll" aria-hidden="true">
          <div className="hero__ring">
            <div className="hero__ring-breath">
              <span className="ring ring--glow" />
              <span className="ring ring--core" />
              <span className="ring ring--sweep" />
            </div>
          </div>
        </div>

        <h1 className={`hero__title ${metal ? 'hero__title--hidden' : 'hero__wordmark'}`}>
          <span aria-hidden="true">iGROUP</span>
          <span className="sr-only">iGroup Solutions</span>
        </h1>
        {metal && (
          <div className="hero__wordmark hero__metal" aria-hidden="true">
            {lit && (
              <MetallicPaint
                text="iGROUP"
                fontFamily="Unbounded"
                fontWeight={700}
                letterSpacing={0.14}
                color={light ? '#c8701a' : '#f7c48a'}
                lightMode={light}
                scale={0.96}
                density={2}
                softness={0.12}
                dispersion={0.22}
                distortion={0.05}
                edgeBend={0.6}
                angle={70}
                speed={0.55}
                mouseTilt={0.35}
                intro
              />
            )}
          </div>
        )}
        <p className="hero__solutions" aria-hidden="true">
          SOLUTIONS
        </p>
      </div>

      <div className="hero__content">
        <h2 className="hero__headline">{HERO.headline}</h2>
        <p className="hero__tagline hero__reveal">{HERO.tagline}</p>
        <p className="hero__sub hero__reveal">{HERO.sub}</p>
        <div className="hero__actions hero__reveal">
          <a href="#contact" className="btn btn--light" onClick={e => (e.preventDefault(), scrollToSection('contact'))}>
            {HERO.cta}
            <Icon name="arrow" size={18} />
          </a>
          <a href="#services" className="btn btn--ghost" onClick={e => (e.preventDefault(), scrollToSection('services'))}>
            Our Services
          </a>
        </div>
        <p className="hero__since hero__reveal">Software development in Sri Lanka · since 2015</p>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span />
        Scroll
      </div>
    </section>
  );
}
