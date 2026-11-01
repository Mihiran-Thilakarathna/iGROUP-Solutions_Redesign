const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

const PATHS = {
  web: <><rect x="2.5" y="4" width="19" height="14" rx="2" /><path d="M2.5 8h19M6 6h.01M8.5 6h.01M9 13l-2 1.5L9 16M15 13l2 1.5L15 16M12.8 12.2l-1.6 4.6" /></>,
  cart: <><path d="M3 4h2.2l2.1 10.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.2L20.5 8H6.1" /><circle cx="9.5" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></>,
  team: <><circle cx="9" cy="8" r="3.2" /><path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" /><circle cx="17.2" cy="9" r="2.4" /><path d="M16 13.6a5 5 0 0 1 5.2 4.9" /></>,
  mobile: <><rect x="6.5" y="2.5" width="11" height="19" rx="2.4" /><path d="M10.5 18.5h3" /></>,
  consult: <><path d="M4 18.5V5.5A2 2 0 0 1 6 3.5h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5L4 18.5Z" /><path d="M8.5 8.5h7M8.5 11.5h4.5" /></>,
  design: <><path d="m14.5 4.5 5 5L9 20H4v-5L14.5 4.5Z" /><path d="m12.5 6.5 5 5" /></>,
  home: <><path d="M3.5 11 12 4l8.5 7" /><path d="M5.5 9.5V20h13V9.5M10 20v-5.5h4V20" /></>,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  // one bold, round-capped diagonal arrow used everywhere
  arrow: <path strokeWidth="2.8" d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />,
  arrowUpRight: <path strokeWidth="2.8" d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />,
  phone: <path d="M5 3.5h3.2l1.6 4-2 1.3a10.5 10.5 0 0 0 5.4 5.4l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  facebook: <path d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H8.5v3.5H11V21h3.5v-6.5H17l.5-3.5h-3V9a.5.5 0 0 1 .5-.5Z" />,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.2 6.8h.01" /></>,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10.5 9.5 4 2.5-4 2.5v-5Z" /></>,
  // solid brand marks for the social dock
  facebookSolid: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2a10 10 0 0 0-1.6 19.87v-6.99H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v6.99A10 10 0 0 0 12 2Z"
    />
  ),
  instagramBold: <g strokeWidth="2.1"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" /></g>,
  youtubeSolid: (
    <path
      fill="currentColor"
      stroke="none"
      fillRule="evenodd"
      d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77c.4-1.56.4-4.8.4-4.8s0-3.24-.4-4.8ZM10 15.2V8.8l5.4 3.2L10 15.2Z"
    />
  )
};

export default function Icon({ name, size = 24, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      {PATHS[name]}
    </svg>
  );
}
