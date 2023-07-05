export interface BackgroundAction {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface Projects {
  image: string;
  title: string;
  description: string;
  technologies: string;
  github?: string;
  demo?: string;
}

export interface InfoCard {
  technology: string;
  title: string;
  description: string;
  image: string;
}

export const infoCards: InfoCard[] = [
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

export const projects: Projects[] = [
  {
    image: 'assets/projects/myFlix-React-pic.PNG',
    title: 'myFlix React',
    description:
      'This project is the client-side version of a myFlix application built using React. It uses a MongoDB database to store data about registered users and movies. It uses a RESTful API to communicate with the the database and the client.',
    technologies: 'React, Redux, React-Bootstrap, Axios, Parcel',
    github: 'https://github.com/RyanViers/myFlix-client',
    demo: 'https://ryan-viers-08aa31.netlify.app/',
  },
  {
    image: 'assets/projects/angular-profile-pic.PNG',
    title: 'myFlix Angular',
    description:
      'This project is the client-side version of a myFlix application built using Angular. It uses a MongoDB database to store data about registered users and movies. It uses a RESTful API to communicate with the the database and the client.',
    technologies: 'Angular, Angular Material',
    github: 'https://github.com/RyanViers/myFlix-Angular-client',
    demo: 'https://ryanviers.github.io/myFlix-Angular-client/',
  },
  {
    image: 'assets/projects/pokedex-app-pic.PNG',
    title: 'Pokedex',
    description:
      'This is a small application made with HTML, CSS, and JavaScript. The Pokémon are loaded from an external API. The user can then search for a Pokémon by name and see its details.',
    technologies: 'HTML, CSS, JavaScript, jQuery, Bootstrap',
    github: 'https://github.com/RyanViers/pokedex-app',
    demo: 'https://ryanviers.github.io/pokedex-app/',
  },
  {
    image: 'assets/projects/pizza-pic.PNG',
    title: 'Pizza App',
    description:
      'This is an application for a pizza resturant that allows users to build their own pizza and place an order. Users can also buy specialty pizzas and manage their profiles.',
    technologies:
      'Angular, Ionic, Tailwind, AWS, Amplify, AppSync, DynamoDB, Cognito, S3, Lambda, CloudFormation',
    github: 'https://github.com/RyanViers/pizza-app',
    demo: 'https://github.com/RyanViers/pizza-app',
  },
  {
    image: 'assets/projects/api-pic.PNG',
    title: 'myFlix REST API',
    description:
      'This API is the server-side code for the Angular and React myFlix apps. This API allows users to create an account, see information about movies, directors and genres, add and remove movies to their favorites, edit their personal info and more. This is an RESTful API and includes HTTP authentication with JWT passport authentication, bcrypt password hashing, express-validator for server-side input validation and CORS data security.',
    technologies: 'MongoDB, Express, Mongoose, Morgan, Node.js',
    github: 'https://github.com/RyanViers/movie-api',
    demo: 'https://github.com/RyanViers/movie-api',
  },
  {
    image: 'assets/projects/chat-pic.PNG',
    title: 'Chat App',
    description:
      'This is a chat application that allows users to create a username and join a chat room. Users can send messages to each other and see when other users join or leave the chat room.',
    technologies: 'React Native, Node.js, Express',
    github: 'https://github.com/RyanViers/chat',
    demo: 'https://github.com/RyanViers/chat',
  },
  {
    image: 'assets/projects/meet_screenshot.PNG',
    title: 'Meet App',
    description:
      'This application was built with React.js using a test-driven development (TDD) approach. The app is a serverless, progressive web application (PWA) that uses the Google Calander API to display upcoming events in cites around the world. The user can select the number of events and the city they want to see events for. The app uses a pie chart and a scatter chart to display number of events per city and the code language for the events.',
    technologies:
      'React, Jest, Cucumber, Puppeteer, Enzyme, Google Calander API, AWS',
    github: 'https://github.com/RyanViers/meet',
    demo: 'https://ryanviers.github.io/meet/',
  },
];
