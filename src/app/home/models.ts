export interface BackgroundAction {
  title: string;
  description: string;
  image: string;
  action: () => void;
}
