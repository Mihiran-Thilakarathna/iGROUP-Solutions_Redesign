import { useLayoutEffect, useRef } from 'react';
import { gsap, useGSAP, scrollToSection, revealEach } from '../gsap.js';
import { NAV, CONTACT, SERVICES, CAREERS } from '../data/content.js';
import SocialDock from './SocialDock.jsx';
import Icon from './Icons.jsx';

const WORD = 'iGROUP';

export default function Footer() {
  const root = useRef(null);
  const word = useRef(null);

  // size the wordmark so all six letters fill the width exactly
  useLayoutEffect(() => {
    const el = word.current;
    const fit = () => {
      const box = getComputedStyle(el.parentElement);
      const available = el.parentElement.clientWidth - parseFloat(box.paddingLeft) - parseFloat(box.paddingRight);
      if (available <= 0) return;
      el.style.fontSize = '100px';
      let size = (available / el.getBoundingClientRect().width) * 100;
      el.style.fontSize = `${size}px`;
      // glyph metrics don't scale perfectly linearly, so correct once against the real width
      size *= available / el.getBoundingClientRect().width;
      el.style.fontSize = `${size * 0.995}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    window.addEventListener('resize', fit);
    // the 800 weight is only fetched once used, so refit when it actually arrives
    document.fonts?.load('800 100px Unbounded').then(fit);
    document.fonts?.ready.then(fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  useGSAP(
    () => {
      gsap.from('.footer__letter', {
        yPercent: 100,
        duration: 1.4,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.footer__word-wrap', start: 'top 95%' }
      });
      gsap.from('.footer__cta-line > span', {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.footer__cta', start: 'top 80%' }
      });
      revealEach('.footer__col', { y: 30, opacity: 0 }, { stagger: 0.08 });
    },
    { scope: root }
  );

  const go = id => e => (e.preventDefault(), scrollToSection(id));

  return (
    <footer className="footer" ref={root}>
      <div className="footer__glow" aria-hidden="true" />

      <div className="container footer__cta">
        <p className="eyebrow">Have a project in mind?</p>
        <a href="#contact" className="footer__cta-title" onClick={go('contact')}>
          <span className="footer__cta-line">
            <span>Let&apos;s build your</span>
          </span>
          <span className="footer__cta-line">
            <span>
              digital future
              <span className="footer__cta-arrow" aria-hidden="true">
                <Icon name="arrowUpRight" size={64} />
              </span>
            </span>
          </span>
        </a>
      </div>

      <div className="container footer__grid">
        <div className="footer__col footer__brand">
          <img className="footer__logo" src="logo-dark.svg" alt="iGroup Solutions" width="400" height="180" />
          <p className="footer__tag">We Build Your Digital Future — delivering since 2015.</p>
          <SocialDock className="social-dock--sm" />
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3 className="footer__head">Navigate</h3>
          {NAV.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="footer__col">
          <h3 className="footer__head">Services</h3>
          {SERVICES.map(s => (
            <a key={s.title} href="#services" onClick={go('services')}>
              {s.title}
            </a>
          ))}
        </div>

        <div className="footer__col">
          <h3 className="footer__head">Contact</h3>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <h3 className="footer__head footer__head--gap">Careers</h3>
          <a href={`mailto:${CAREERS.email}`}>{CAREERS.email}</a>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Copyright: iGroup Solutions</span>
        <span>Software Development in Sri Lanka</span>
        <a href="#home" className="footer__top" onClick={go('home')}>
          Back to top
          <Icon name="arrowUpRight" size={16} />
        </a>
      </div>

      <div className="container footer__word-wrap" aria-hidden="true">
        <div className="footer__word" ref={word}>
          {WORD.split('').map((ch, i) => (
            <span className="footer__letter" key={i}>
              {ch}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
