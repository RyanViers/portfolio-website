import { Injectable } from "@angular/core";
import { InfoCard, Projects } from "../utils/models";

@Injectable()
export class ProjectsService {
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
  
  projects: Projects[] = [
    {
      image: 'assets/projects/myFlix-React-pic.PNG',
      title: 'myFlix React',
      description:
        'MyFlix, a client-side app built with React, employs MongoDB for data storage and a RESTful API for smooth client-database interaction.',
      technologies: 'React, Redux, React-Bootstrap, Axios, Parcel',
      github: 'https://github.com/RyanViers/myFlix-client',
      demo: 'https://ryan-viers-08aa31.netlify.app/',
    },
    {
      image: 'assets/projects/angular-profile-pic.PNG',
      title: 'myFlix Angular',
      description: `MyFlix's client-side application, constructed with Angular, utilizes MongoDB for data storage, complemented by a RESTful API for seamless client-database connectivity.`,
      technologies: 'Angular, Angular Material',
      github: 'https://github.com/RyanViers/myFlix-Angular-client',
      demo: 'https://ryanviers.github.io/myFlix-Angular-client/',
    },
    {
      image: 'assets/projects/pokedex-app-pic.PNG',
      title: 'Pokedex',
      description:
        'A compact HTML, CSS, and JavaScript application that fetches Pokémon from an external API, enabling user search for specific Pokémon and their details.',
      technologies: 'HTML, CSS, JavaScript, jQuery, Bootstrap',
      github: 'https://github.com/RyanViers/pokedex-app',
      demo: 'https://ryanviers.github.io/pokedex-app/',
    },
    {
      image: 'assets/projects/pizza-pic.PNG',
      title: 'Pizza App',
      description: `An interactive pizza restaurant application, enabling users to custom-build pizzas, order specialty pizzas, and manage their profiles.`,
      technologies: 'Angular, Ionic, Tailwind, AWS, Amplify, AppSync, DynamoDB',
      github: 'https://github.com/RyanViers/pizza-app',
      demo: 'https://github.com/RyanViers/pizza-app',
    },
    {
      image: 'assets/projects/api-pic.PNG',
      title: 'myFlix REST API',
      description: `The myFlix API, powering both Angular and React versions, provides comprehensive user features, complete with JWT authentication, bcrypt hashing, express-validator input validation, and CORS security.`,
      technologies: 'MongoDB, Express, Mongoose, Morgan, Node.js',
      github: 'https://github.com/RyanViers/movie-api',
      demo: 'https://github.com/RyanViers/movie-api',
    },
    {
      image: 'assets/projects/chat-pic.PNG',
      title: 'Chat App',
      description: `A user-friendly chat application, facilitating username creation, chat room joining, and real-time messaging, with notifications for user activity.`,
      technologies: 'React Native, Node.js, Express',
      github: 'https://github.com/RyanViers/chat',
      demo: 'https://github.com/RyanViers/chat',
    },
    {
      image: 'assets/projects/meet_screenshot.PNG',
      title: 'Meet App',
      description: `A React.js-based serverless PWA, developed using TDD. It employs Google Calendar API to showcase upcoming global events, allowing user customization by event count and city, with data visualization through pie and scatter charts.`,
      technologies: 'React, Jest, Cucumber, Puppeteer, Enzyme, AWS',
      github: 'https://github.com/RyanViers/meet',
      demo: 'https://ryanviers.github.io/meet/',
    },
  ];
}