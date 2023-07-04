export interface BackgroundAction {
  title: string;
  description: string;
  image: string;
  action: () => void;
}

export interface Projects {
  image: string;
  title: string;
  description: string;
  technologies: string;
}
