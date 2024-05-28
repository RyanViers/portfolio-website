import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, inject } from "@angular/core";
import { TailwindIcon, TailwindIconType } from "../utils/tailwind-icons";
import { AboutBottom, AboutList } from "./models";

@Injectable()
export class AboutService {
  private sanitizer = inject(DomSanitizer);

  aboutList: AboutList[] = [
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.GLOBE, this.sanitizer),
      title: 'Be world-class. ',
      description: `My aim is to consistently deliver top-tier results, grounded in thorough research, efficient code, and innovative problem-solving.`,
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.PEOPLE, this.sanitizer),
      title: 'Be supportive. ',
      description: `I believe in cultivating an environment of collaboration and open communication, where every idea is valued and constructive feedback propels us forward.`,
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.SHARE, this.sanitizer),
      title: 'Share everything you know. ',
      description: `Transparency is key in my work ethic. I believe in sharing knowledge and insights, fostering mutual growth, and creating a stronger development community.`,
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.BELL_ALERT, this.sanitizer),
      title: 'Take responsibility. ',
      description: `Take Responsibility: Owning every line of code and every project outcome is crucial. From brainstorming to debugging, I am committed to ensuring the highest quality results.`,
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.EXCLAMATION_TRIANGLE, this.sanitizer),
      title: 'Always learning. ',
      description: `The tech landscape is ever-evolving, and so am I. I continually strive to broaden my knowledge and skills, staying current with the latest trends and technologies.`,
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.COMPASS, this.sanitizer),
      title: 'Enjoy downtime. ',
      description: `Balancing work and relaxation is important for consistent productivity. I value the refreshing power of downtime, fostering creativity, and maintaining work-life harmony.`,
    },
  ];

  aboutBottom: AboutBottom[] = [
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.CHECK_CIRCLE, this.sanitizer),
      title: 'Expertise Across the Stack',
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.CHECK_CIRCLE, this.sanitizer),
      title: 'Project Ownership',
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.CHECK_CIRCLE, this.sanitizer),
      title: 'Continuous Support',
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.CHECK_CIRCLE, this.sanitizer),
      title: 'Transparent Communication',
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.CHECK_CIRCLE, this.sanitizer),
      title: 'Adaptability',
    },
    {
      icon: TailwindIcon.getTailwindIconSvg(TailwindIconType.CHECK_CIRCLE, this.sanitizer),
      title: 'Result-driven Approach',
    },
  ];
}