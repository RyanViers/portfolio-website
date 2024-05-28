import { Injectable } from "@angular/core";
import { NavButton } from "./models";

@Injectable()
export class FooterService {
  navButtons: NavButton[] = [
    { label: 'Home', route: '/home' },
    { label: 'About', route: '/about' },
    { label: 'Projects', route: '/projects' },
    { label: 'Contact', route: '/contact' },
  ];
}