import { useTheme, toggleTheme } from '../theme.js';

// sun ⇄ moon: the core swells and a shadow disc slides over it to carve the crescent,
// while the rays spin in or out — all transforms, so it stays smooth mid-transition
export default function ThemeToggle({ className = '' }) {
  const theme = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  const onClick = e => {
    const r = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      data-theme-state={theme}
      onClick={onClick}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <mask id="theme-toggle-cut">
          <rect width="24" height="24" fill="#fff" />
          <circle className="theme-toggle__cut" cx="17" cy="7" r="7" fill="#000" />
        </mask>
        <circle className="theme-toggle__core" cx="12" cy="12" r="9" fill="currentColor" mask="url(#theme-toggle-cut)" />
        <g className="theme-toggle__rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="1.5" x2="12" y2="3.5" />
          <line x1="12" y1="20.5" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="3.5" y2="12" />
          <line x1="20.5" y1="12" x2="22.5" y2="12" />
          <line x1="4.6" y1="4.6" x2="6" y2="6" />
          <line x1="18" y1="18" x2="19.4" y2="19.4" />
          <line x1="4.6" y1="19.4" x2="6" y2="18" />
          <line x1="18" y1="6" x2="19.4" y2="4.6" />
        </g>
      </svg>
    </button>
  );
}
