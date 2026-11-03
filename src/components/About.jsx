import { useRef } from 'react';
import { gsap, useGSAP, scrollToSection, revealEach } from '../gsap.js';
import { ABOUT } from '../data/content.js';
import ScrollReveal from './reactbits/ScrollReveal.jsx';
import StarBorder from './reactbits/StarBorder.jsx';
import Icon from './Icons.jsx';

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about__year',
        { xPercent: 10 },
        { xPercent: -10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } }
      );
      revealEach('.about__aside > *', { y: 40, opacity: 0 }, { stagger: 0.12 });
      // phones: the year is a captioned line under the lead; it draws in left to right
      gsap.from('.about__since-year', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.about__since', start: 'top 90%' }
      });
    },
    { scope: root }
  );

  return (
    <section id="about" className="section about" ref={root}>
      <div className="about__year" aria-hidden="true">
        2015
      </div>
      <div className="container about__grid">
        <div>
          <div className="eyebrow">(02) — About Us</div>
          <ScrollReveal
            baseOpacity={0.12}
            enableBlur
            blurStrength={6}
            baseRotation={2}
            containerClassName="about__lead"
            textClassName="about__lead-text"
            highlightColor="#f79420"
          >
            {ABOUT.lead}
          </ScrollReveal>
          <div className="about__since" aria-hidden="true">
            <span className="about__since-label">
              Delivering
              <br />
              since
            </span>
            <span className="about__since-year">2015</span>
          </div>
        </div>
        <div className="about__aside">
          <p className="lede">{ABOUT.body}</p>
          <StarBorder
            as="a"
            href="#contact"
            color="#f79420"
            trailColor="#ffc46b"
            radius={999}
            duration={3.5}
            onClick={e => (e.preventDefault(), scrollToSection('contact'))}
          >
            <span className="about__cta">
              Let&apos;s Discuss Your Project <Icon name="arrow" size={18} />
            </span>
          </StarBorder>
        </div>
      </div>
    </section>
  );
}
