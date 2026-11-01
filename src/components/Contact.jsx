import { useRef } from 'react';
import { useGSAP, revealEach } from '../gsap.js';
import { CONTACT } from '../data/content.js';
import SectionHeading from './SectionHeading.jsx';
import Icon from './Icons.jsx';
import SocialDock from './SocialDock.jsx';

const FIELDS = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Your email', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Your phone number', type: 'tel', autoComplete: 'tel' },
  { name: 'subject', label: 'Subject', type: 'text' }
];

export default function Contact() {
  const root = useRef(null);

  useGSAP(
    () => {
      // the card stacks under the form on phones, so each gets its own trigger
      revealEach('.contact__form, .contact__card', { y: 60, opacity: 0 }, { stagger: 0.15, duration: 1 });
    },
    { scope: root }
  );

  return (
    <section id="contact" className="section contact" ref={root}>
      <div className="container">
        <SectionHeading eyebrow="(05) — Contact us" title="Let's discuss your project" />

        <div className="contact__grid">
          {/* posts to the same mail handler the current site uses */}
          <form className="contact__form" action={CONTACT.formAction} method="post">
            <h3 className="contact__form-title">Write to us</h3>
            <div className="contact__fields">
              {FIELDS.map(f => (
                <label className="field" key={f.name}>
                  <input
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    required={f.required}
                    placeholder=" "
                  />
                  <span>{f.label}</span>
                </label>
              ))}
              <label className="field field--full">
                <textarea name="message" rows="5" required placeholder=" " />
                <span>Your message</span>
              </label>
            </div>
            <button type="submit" className="btn btn--brand contact__submit">
              Submit
              <Icon name="arrow" size={18} />
            </button>
          </form>

          <aside className="contact__card">
            <h3 className="contact__form-title">Contact us</h3>
            <a className="contact__line" href={CONTACT.phoneHref}>
              <span className="contact__icon">
                <Icon name="phone" size={20} />
              </span>
              <span>
                <small>Call us</small>
                {CONTACT.phone}
              </span>
            </a>
            <a className="contact__line" href={`mailto:${CONTACT.email}`}>
              <span className="contact__icon">
                <Icon name="mail" size={20} />
              </span>
              <span>
                <small>Email us</small>
                {CONTACT.email}
              </span>
            </a>
            <div className="contact__follow">
              <p>Follow us</p>
              <SocialDock />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
