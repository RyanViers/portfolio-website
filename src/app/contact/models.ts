export interface ContactList {
  icon: number;
  title: string;
  description: string;
  emailLink?: string;
  link?: string;
  linkText: string;
}

export const contactList: ContactList[] = [
  {
    icon: 10,
    title: 'Email',
    description: `For project inquiries, suggestions, or just a casual tech chat, feel free to drop me an email. Let's start a conversation and see how we can bring your digital ideas to life.`,
    emailLink: 'mailto:ryanviersiv@gmail.com',
    linkText: 'Contact Me ',
  },
  {
    icon: 12,
    title: 'Explore My Projects',
    description: `If you're interested in my work and want to delve deeper into what I do, navigate back to my Projects page. There, you'll get a sense of my skills, style, and the value I could bring to your project.`,
    link: '/projects',
    linkText: 'View Projects ',
  },
  {
    icon: 11,
    title: 'Learn More About Me',
    description: `Curious to know more about my professional journey, my values, or my approach to web development? The 'About Me' section is the perfect place to start.`,
    link: '/about',
    linkText: 'About Me ',
  },
];
