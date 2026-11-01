// All copy is carried over from the existing igroupsolutions.lk site.
// Service tags are short labels lifted from each service's own description.

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'clients', label: 'Clients' },
  { id: 'careers', label: 'Careers' },
  { id: 'contact', label: 'Contact' }
];

export const HERO = {
  headline: 'We Build Your Digital Future',
  tagline: 'To improve business agility and efficiency',
  sub: 'Delivering on our commitments since 2015 with motivated, skilled, and experienced developers.',
  cta: "Let's Discuss Your Project"
};

export const STATS = [
  { value: 2015, from: 2000, label: 'Delivering since' },
  { value: 6, label: 'Service focus areas' },
  { value: 5, suffix: '+', label: 'Client platforms live' },
  { value: 3, label: 'Core stacks: PHP, .NET, Java' }
];

export const SERVICES = [
  {
    icon: 'web',
    title: 'Web Application Development',
    tags: ['PHP', '.NET', 'Java'],
    text: 'Companies hire us for our expertise in PHP, .NET, Java to build their web applications.'
  },
  {
    icon: 'cart',
    title: 'E commerce Solutions',
    tags: ['Retail models', 'Tailor-made', 'Fully customized'],
    text: 'Our ecommerce solutions are tailor-made to meet your retail models, and entire Web Development process is fully-customized.'
  },
  {
    icon: 'team',
    title: 'Staff Augmentation',
    tags: ['Specialized staff', 'Experienced'],
    text: 'We have specialized experienced staff in wide variety areas to move your project forward.'
  },
  {
    icon: 'mobile',
    title: 'Mobile Application Development',
    tags: ['iOS', 'Android'],
    text: "Our dedicated mobile app developers (iOS and Android) love creating apps and it's their passion."
  },
  {
    icon: 'consult',
    title: 'Consultancy Solutions',
    tags: ['IT assessment', 'Development'],
    text: 'Our highly skilled experts will help you determine the current state of IT in your company and assist in development.'
  },
  {
    icon: 'design',
    title: 'UX/UI Conceptualization',
    tags: ['Simplicity', 'Visual', 'Innovation'],
    text: 'We believe in simplicity and focus in visual representation with innovative ideas.'
  }
];

export const ABOUT = {
  lead: 'iGroup Solutions is an emerging leader in software development industry. We solve business challenges with latest technology.',
  body: "Since our inception in 2015, we have pioneered custom solutions that have become central components in our client's business success. Our vast technology and industry expertise enables us to partner with clients to deliver sophisticated solutions rapidly and on budget."
};

export const CLIENTS = {
  logos: [
    { name: 'bodim.lk', src: 'clients/bodim.lk-logo.png', href: 'https://www.bodim.lk/' },
    { name: 'iwedding.lk', src: 'clients/iwedding.lk-logo.png', href: 'https://www.iwedding.lk/' },
    { name: 'healthaid.lk', src: 'clients/healthaid.lk-logo.png', href: 'https://www.healthaid.lk/' },
    { name: 'shineway.lk', src: 'clients/shineway.lk-logo.png', href: 'https://www.shineway.lk/' },
    { name: 'careerfair.lk', src: 'clients/careerfair.lk-logo.png', href: 'https://www.careerfair.lk/' }
  ],
  intro:
    'Simply put, our clients are our partners. Whether working on a website redesign, enhancement or digital marketing services, we make achieving client goals our focus each and every day.',
  outro: 'Our clients include home builders, e-commerce retailers and businesses across a variety of industries.'
};

export const CAREERS = {
  kicker: 'WE WANT YOU',
  title: "It's your time! Challenge us to see the best in you",
  join: 'Join our team !',
  email: 'careers@igroupsolutions.lk',
  roles: [
    { area: 'Project Management', titles: 'Project Manager, Senior Project Manager.' },
    { area: 'Business Analysis', titles: 'Business Analyst, Senior Business Analyst.' },
    { area: 'Software Development', titles: 'Trainee Software Engineer, Software Engineer, Senior Software Engineer.' },
    { area: 'Quality Assurance', titles: 'Trainee QA Engineer, QA Engineer, Senior QA Engineer.' }
  ]
};

export const CONTACT = {
  phone: '091-2252697',
  phoneHref: 'tel:+94912252697',
  email: 'info@igroupsolutions.lk',
  // the existing site's mail handler — absolute so the form also works when hosted elsewhere (e.g. Vercel)
  formAction: 'https://www.igroupsolutions.lk/lib/mail.php',
  socials: [
    { icon: 'facebook', label: 'Visit our Facebook page', href: 'https://web.facebook.com/profile.php?id=61582292352218' },
    {
      icon: 'instagram',
      label: 'Visit our Instagram profile',
      href: 'https://www.instagram.com/igroupsolutions?igsh=MTR2NHVkZTh1enJyNw%3D%3D&utm_source=qr'
    },
    { icon: 'youtube', label: 'Visit our YouTube channel', href: 'https://www.youtube.com/@igroupsolutions-i' }
  ]
};
