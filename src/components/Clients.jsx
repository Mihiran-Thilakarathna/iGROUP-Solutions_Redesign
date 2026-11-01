import { useRef } from 'react';
import { gsap, useGSAP } from '../gsap.js';
import { CLIENTS } from '../data/content.js';
import LogoLoop from './reactbits/LogoLoop.jsx';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icons.jsx';

// silhouettes at rest, true colours on a light tile when hovered (as on wso2.com)
const logos = CLIENTS.logos.map(c => ({
  node: (
    <span className="client-logo">
      <img src={c.src} alt="" loading="lazy" draggable={false} />
    </span>
  ),
  title: c.name,
  ariaLabel: c.name,
  href: c.href
}));

// CLIENTS.outro, broken into plain words and highlighted phrases
const STATEMENT = [
  'Our clients include',
  { text: 'home builders', icon: 'home' },
  ',',
  { text: 'e-commerce retailers', icon: 'cart' },
  'and businesses across a',
  { text: 'variety of industries', icon: 'grid' },
  '.'
];

export default function Clients() {
  const root = useRef(null);

  useGSAP(
    () => {
      // words brighten as the statement scrolls through, the pills pop in on cue
      gsap.fromTo(
        '.statement__word:not(.statement__pill)',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: '.statement', start: 'top 85%', end: 'bottom 55%', scrub: true }
        }
      );
      // pills pop in as each one reaches the screen — the statement wraps to many lines on a phone
      gsap.utils.toArray('.statement__pill').forEach(pill =>
        gsap.fromTo(
          pill,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.8)',
            scrollTrigger: { trigger: pill, start: 'top 82%' }
          }
        )
      );
    },
    { scope: root }
  );

  return (
    <section id="clients" className="section clients" ref={root}>
      <div className="container">
        <SectionHeading eyebrow="(03) — Our Clients" title="Our clients are our partners" align="center">
          <p className="lede clients__intro">{CLIENTS.intro}</p>
        </SectionHeading>
      </div>

      <div className="clients__loop">
        <LogoLoop
          logos={logos}
          speed={60}
          hoverSpeed={0}
          logoHeight={96}
          gap={20}
          fadeOut
          fadeOutWidth={0.14}
          ariaLabel="Client websites"
        />
      </div>

      <div className="container">
        <p className="statement" aria-label={CLIENTS.outro}>
          {STATEMENT.map((part, i) =>
            typeof part === 'string' ? (
              part.split(' ').map((w, j) => (
                <span className="statement__word" key={`${i}-${j}`} aria-hidden="true">
                  {w}{' '}
                </span>
              ))
            ) : (
              <span className="statement__pill statement__word" key={i} aria-hidden="true">
                <Icon name={part.icon} size={18} />
                {part.text}
              </span>
            )
          )}
        </p>
      </div>
    </section>
  );
}
