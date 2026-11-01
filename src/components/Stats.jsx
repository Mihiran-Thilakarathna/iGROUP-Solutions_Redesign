import CountUp from './reactbits/CountUp.jsx';
import { STATS } from '../data/content.js';

export default function Stats() {
  return (
    <section className="stats" aria-label="iGroup Solutions at a glance">
      <div className="container stats__grid">
        {STATS.map(s => (
          <div className="stats__item" key={s.label}>
            <div className="stats__value">
              <CountUp from={s.from ?? 0} to={s.value} duration={2.2} />
              {s.suffix && <span className="accent">{s.suffix}</span>}
            </div>
            <p className="stats__label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
