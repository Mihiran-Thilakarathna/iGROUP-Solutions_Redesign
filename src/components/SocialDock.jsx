import { useState } from 'react';
import { CONTACT } from '../data/content.js';
import Icon from './Icons.jsx';

const SOLID = { facebook: 'facebookSolid', instagram: 'instagramBold', youtube: 'youtubeSolid' };

// icon row with a tile that glides under whichever icon is hovered or focused
export default function SocialDock({ className = '' }) {
  const [active, setActive] = useState(null);

  return (
    <div
      className={`social-dock ${className}`}
      data-on={active !== null}
      style={{ '--i': active ?? 0 }}
      onMouseLeave={() => setActive(null)}
    >
      <span className="social-dock__hl" aria-hidden="true" />
      {CONTACT.socials.map((s, i) => (
        <a
          key={s.icon}
          className="social-dock__item"
          href={s.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={s.label}
          title={s.label}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onBlur={() => setActive(null)}
        >
          <Icon name={SOLID[s.icon]} size={40} />
        </a>
      ))}
    </div>
  );
}
