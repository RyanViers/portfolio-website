export type Links = {
  id: number;
  name: string;
  url: string;
}

export const headerLinks: Links[] = [
  { id: 1, name: 'Home', url: '/home' },
  { id: 2, name: 'About', url: '/about' },
  { id: 3,  name: 'Projects', url: '/projects' },
  { id: 4,  name: 'Contact', url: '/contact' },
];