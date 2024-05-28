import { Injectable } from "@angular/core";
import { BackgroundAction, InfoCard } from "../utils/models";

@Injectable()
export class HomeService {

  backgroundActionOptions: BackgroundAction = {
    title: 'Curious to Know More?',
    description: `Navigate to the 'About' section for a deeper dive into my journey, skills, and work ethic`,
    image: 'assets/content/code-1.webp',
    link: '/about',
  };
  
  backgroundActionOptions2: BackgroundAction = {
    title: 'Ready to Connect?',
    description: `Head to the 'Contact' section to get in touch and start discussing your project needs`,
    image: 'assets/content/code2.jpeg',
    link: '/contact',
  };

  infoCards: InfoCard[] = [
    {
      technology: 'Angular',
      title: 'Mastering Modular Web Development',
      description:
        'Angular is my tool of choice when developing scalable, dynamic web applications. Its emphasis on a modular architecture and two-way data binding enables me to craft intuitive and highly interactive user experiences with ease.',
      image: 'assets/technology/angular.png',
    },
    {
      technology: 'React',
      title: 'Building UIs for a Seamless User Experience',
      description:
        " React enables me to build fast, responsive user interfaces with its component-based architecture and virtual DOM. It's an essential part of my toolkit for creating seamless, user-centric web applications.",
      image: 'assets/technology/react.png',
    },
    {
      technology: 'Tailwind CSS',
      title: 'Utility-First Approach to Custom Designs',
      description:
        'Tailwind CSS offers me a utility-first framework to create custom, responsive designs. It empowers me to build unique, elegant, and mobile-first designs that perfectly match project specifications and enhance the user experience.',
      image: 'assets/technology/tailwind.png',
    },
  ];
}