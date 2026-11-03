import { gsap } from './gsap.js';

// Mouse events alone miss rows moving beneath a stationary pointer during scroll/reveals.
export function trackRowHover(rows, onChange = () => {}) {
  if (!rows.length) return () => {};
  const active = new Map(rows.map(row => [row, false]));
  let pointer = null;
  let visible = true;

  const sync = () => {
    const hit = pointer && visible ? document.elementFromPoint(pointer.x, pointer.y) : null;
    for (const row of rows) {
      const on = (!!hit && row.contains(hit)) || row.matches(':focus-visible');
      if (active.get(row) === on) continue;
      active.set(row, on);
      row.classList.toggle('is-lit', on);
      const rect = row.getBoundingClientRect();
      const edge = pointer && pointer.y < rect.top + rect.height / 2 ? -101 : 101;
      onChange(row, on, edge);
    }
  };
  const onMove = event => {
    if (event.pointerType === 'touch') return;
    pointer = { x: event.clientX, y: event.clientY };
    sync();
  };
  const onLeave = () => {
    pointer = null;
    sync();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(rows[0].parentElement);

  window.addEventListener('pointermove', onMove, { passive: true });
  // A wheel gesture can be the first input after load, without any pointer movement.
  window.addEventListener('wheel', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  window.addEventListener('blur', onLeave);
  document.addEventListener('focusin', sync);
  document.addEventListener('focusout', sync);
  // Lenis and reveal tweens run on this ticker; hit-test after their positions update.
  gsap.ticker.add(sync);
  sync();

  return () => {
    gsap.ticker.remove(sync);
    observer.disconnect();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('wheel', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    window.removeEventListener('blur', onLeave);
    document.removeEventListener('focusin', sync);
    document.removeEventListener('focusout', sync);
    rows.forEach(row => row.classList.remove('is-lit'));
  };
}
