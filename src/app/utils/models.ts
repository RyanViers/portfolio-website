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

