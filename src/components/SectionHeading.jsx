import SplitText from './reactbits/SplitText.jsx';
import ShinyText from './reactbits/ShinyText.jsx';

export default function SectionHeading({ eyebrow, title, align = 'left', variant, children }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div className="eyebrow">
        <ShinyText text={eyebrow} color="#a1a1aa" shineColor="#ffc46b" speed={3} />
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
