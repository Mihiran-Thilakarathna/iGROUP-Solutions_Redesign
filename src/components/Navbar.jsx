import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, scrollToSection } from '../gsap.js';
import { NAV } from '../data/content.js';
import Icon from './Icons.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import './Navbar.css';

export default function Navbar() {
  const root = useRef(null);
  const pill = useRef(null);
  const links = useRef({});
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // track which section is in view
  useGSAP(() => {
    const triggers = NAV.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: self => self.isActive && setActive(id)
      })
    );
    const bar = ScrollTrigger.create({ start: 40, end: 'max', onToggle: self => setScrolled(self.isActive) });
    return () => [...triggers, bar].forEach(t => t.kill());
  });

  // slide the white pill under the active link
  useEffect(() => {
    const el = links.current[active];
    if (!el || !pill.current) return;
    gsap.to(pill.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.6,
      ease: 'power3.out'
    });
  }, [active]);

  // mobile sheet
  useGSAP(
    () => {
      if (!open) return;
      gsap.fromTo('.nav__sheet', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.inOut' });
      gsap.from('.nav__sheet-link', { y: 30, opacity: 0, stagger: 0.05, duration: 0.5, delay: 0.2, ease: 'power3.out' });
    },
    { dependencies: [open], scope: root }
  );

  const go = id => e => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header ref={root} className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__bar">
        <a href="#home" className="nav__logo" onClick={go('home')} aria-label="iGroup Solutions — home">
          <img className="logo-for-dark" src="logo-dark.svg" alt="iGroup Solutions" width="400" height="180" />
          <img className="logo-for-light" src="logo-light.svg" alt="iGroup Solutions" width="400" height="180" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          <span className="nav__pill" ref={pill} aria-hidden="true" />
          {NAV.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              ref={el => (links.current[id] = el)}
              data-label={label}
              className={`nav__link ${active === id ? 'is-active' : ''}`}
              aria-current={active === id ? 'true' : undefined}
              onClick={go(id)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <ThemeToggle />

          <a href="#contact" className="nav__cta" onClick={go('contact')}>
            Let&apos;s Talk
            <Icon name="arrowUpRight" size={16} />
          </a>

          <button
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__sheet">
          {NAV.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} className={`nav__sheet-link ${active === id ? 'is-active' : ''}`} onClick={go(id)}>
              <span>0{i + 1}</span>
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
