import { TailwindIcon, TailwindIconType } from './../utils/tailwind-icons';
import { Injectable, inject } from "@angular/core";
import { ContactList } from "./models";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class ContactService {
  
  private sanitizer = inject(DomSanitizer);

  contactList: ContactList[] = [
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.ENVELOPE, this.sanitizer),
      title: 'Email',
      description: `For project inquiries, suggestions, or just a casual tech chat, feel free to drop me an email. Let's start a conversation and see how we can bring your digital ideas to life.`,
      emailLink: 'mailto:ryanviersiv@gmail.com',
      linkText: 'Contact Me ',
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.DOCUMENT, this.sanitizer),
      title: 'Explore My Projects',
      description: `If you're interested in my work and want to delve deeper into what I do, navigate back to my Projects page. There, you'll get a sense of my skills, style, and the value I could bring to your project.`,
      link: '/projects',
      linkText: 'View Projects ',
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.IMAGE, this.sanitizer),
      title: 'Learn More About Me',
      description: `Curious to know more about my professional journey, my values, or my approach to web development? The 'About Me' section is the perfect place to start.`,
      link: '/about',
      linkText: 'About Me ',
    },
  ];
}