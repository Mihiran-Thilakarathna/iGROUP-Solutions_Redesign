import SplitText from './reactbits/SplitText.jsx';
import ShinyText from './reactbits/ShinyText.jsx';
import { useTheme } from '../theme.js';

// the shimmer is drawn from props, not CSS, so it follows the theme from here
const SHINE = {
  dark: { color: '#a1a1aa', shine: '#ffc46b' },
  light: { color: '#57524b', shine: '#d9700a' }
};

export default function SectionHeading({ eyebrow, title, align = 'left', variant, children }) {
  const shine = SHINE[useTheme()];
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div className="eyebrow">
        <ShinyText text={eyebrow} color={shine.color} shineColor={shine.shine} speed={3} />
      </div>
      <SplitText
        text={title}
        tag="h2"
        className={`section-title ${variant ? `section-title--${variant}` : ''}`}
        splitType="words"
        delay={70}
        duration={1}
        mask
        textAlign={align}
        rootMargin="-80px"
      />
      {children}
    </div>
  );
}
