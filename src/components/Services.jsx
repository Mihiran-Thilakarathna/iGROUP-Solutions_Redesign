import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, scrollToSection, isTouch } from '../gsap.js';
import { SERVICES } from '../data/content.js';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icons.jsx';

export default function Services() {
  const root = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      // rows rise in one after another while their divider draws across
      gsap.utils.toArray('.svc-row').forEach(row => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: 'top 90%' } })
          .from(row.querySelector('.svc-row__rule'), { scaleX: 0, duration: 1.2, ease: 'expo.out' })
          .from(row.querySelectorAll('.svc-row__num, .svc-row__body, .svc-row__tags > span'), {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power3.out'
          }, 0.1);
      });

      // the orange fill slides in from whichever edge the pointer crossed, and out the same way
      const edge = (e, row) => {
        const r = row.getBoundingClientRect();
        return e.clientY - r.top < r.height / 2 ? -101 : 101;
      };
      const rows = gsap.utils.toArray('.svc-row');
      // hand the resting offset to GSAP as yPercent, otherwise it keeps the CSS value as a pixel y
      gsap.set('.svc-row__fill', { y: 0, yPercent: 101 });

      // no hover on touch screens: the row crossing the middle of the screen lights up instead
      if (isTouch()) {
        rows.forEach(row => {
          const fill = row.querySelector('.svc-row__fill');
          ScrollTrigger.create({
            trigger: row,
            start: 'top center',
            end: 'bottom center',
            onToggle: self => {
              row.classList.toggle('is-lit', self.isActive);
              // fill follows the scroll: in from below going down, out through the top, and back again
              const away = self.direction > 0 ? -101 : 101;
              gsap.fromTo(
                fill,
                { yPercent: self.isActive ? -away : gsap.getProperty(fill, 'yPercent') },
                { yPercent: self.isActive ? 0 : away, duration: 0.6, ease: 'power3.out', overwrite: true }
              );
            }
          });
        });
        return undefined;
      }

      const handlers = rows.map(row => {
        const fill = row.querySelector('.svc-row__fill');
        let on = false;
        const enter = contextSafe(e => {
          on = true;
          gsap.fromTo(fill, { yPercent: edge(e, row) }, { yPercent: 0, duration: 0.55, ease: 'power3.out', overwrite: true });
        });
        const leave = contextSafe(e => {
          on = false;
          gsap.to(fill, { yPercent: edge(e, row), duration: 0.5, ease: 'power3.out', overwrite: true });
        });
        // smooth scroll can slide a row under a still cursor without a mouseenter
        const move = e => !on && enter(e);
        row.addEventListener('mouseenter', enter);
        row.addEventListener('mousemove', move);
        row.addEventListener('mouseleave', leave);
        return () => {
          row.removeEventListener('mouseenter', enter);
          row.removeEventListener('mousemove', move);
          row.removeEventListener('mouseleave', leave);
        };
      });
      return () => handlers.forEach(off => off());
    },
    { scope: root }
  );

  return (
    <section id="services" className="section services" ref={root}>
      <div className="container">
        <SectionHeading eyebrow="(01) — Services Focus" title="What we build for you">
          <p className="lede">
            Six focus areas, one partner — from web platforms and online stores to mobile apps and dedicated teams.
          </p>
        </SectionHeading>

        <div className="svc-list">
          {SERVICES.map((s, i) => (
            <a
              key={s.title}
              className="svc-row"
              href="#contact"
              onClick={e => (e.preventDefault(), scrollToSection('contact'))}
            >
              <span className="svc-row__rule" aria-hidden="true" />
              <span className="svc-row__fill" aria-hidden="true" />
              <span className="svc-row__num">0{i + 1}</span>
              <span className="svc-row__body">
                <span className="svc-row__title">{s.title}</span>
                <span className="svc-row__text">{s.text}</span>
              </span>
              <span className="svc-row__tags">
                {s.tags.map(t => (
                  <span key={t}>{t}</span>
                ))}
              </span>
              <span className="svc-row__go" aria-hidden="true">
                <Icon name="arrowUpRight" size={18} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
