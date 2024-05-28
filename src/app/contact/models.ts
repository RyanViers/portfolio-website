import { SafeHtml } from "@angular/platform-browser";

export interface ContactList {
  icon: SafeHtml;
  title: string;
  description: string;
  emailLink?: string;
  link?: string;
  linkText: string;
}
