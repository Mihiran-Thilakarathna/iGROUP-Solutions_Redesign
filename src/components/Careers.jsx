import { useRef } from 'react';
import { gsap, useGSAP } from '../gsap.js';
import { CAREERS } from '../data/content.js';
import ScrollFloat from './reactbits/ScrollFloat.jsx';
import Icon from './Icons.jsx';

export default function Careers() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from('.role', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.careers__roles', start: 'top 82%' }
      });
      gsap.from('.careers__intro > *', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.careers__intro', start: 'top 82%' }
      });
    },
    { scope: root }
  );

  return (
    <section id="careers" className="section careers" ref={root}>
      <div className="careers__glow" aria-hidden="true" />
      <div className="container">
        <div className="eyebrow">(04) — Careers</div>
        <ScrollFloat containerClassName="careers__kicker" textClassName="careers__kicker-text" stagger={0.04} animationDuration={1}>
          {CAREERS.kicker}
        </ScrollFloat>

        <div className="careers__intro">
          <h2 className="careers__title">{CAREERS.title}</h2>
          <div className="careers__apply">
            <p className="careers__join">{CAREERS.join}</p>
            <p className="careers__send">Send your resumes to</p>
            <a href={`mailto:${CAREERS.email}`} className="btn btn--brand">
              <Icon name="mail" size={18} />
              {CAREERS.email}
            </a>
          </div>
        </div>

        <h3 className="careers__looking">We are looking for</h3>
        <ul className="careers__roles">
          {CAREERS.roles.map((r, i) => (
            <li className="role" key={r.area}>
              <span className="role__num">0{i + 1}</span>
              <div>
                <h4 className="role__area">{r.area}</h4>
                <p className="role__titles">{r.titles}</p>
              </div>
              <span className="role__go" aria-hidden="true">
                <Icon name="arrowUpRight" size={20} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
