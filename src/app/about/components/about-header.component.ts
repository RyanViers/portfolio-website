import { Component } from '@angular/core';

@Component({
  selector: 'app-about-header',
  standalone: true,
  template: `<!-- Header section -->
  <div class="px-6 pt-14 lg:px-8">
    <div class="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
      <h2
        class="text-4xl font-bold tracking-tight text-white sm:text-6xl"
      >
        Ryan Viers: Full-Stack Web Development
      </h2>
      <p class="mt-6 text-lg leading-8 text-gray-300">
        Creating engaging digital experiences, one line of code at a time.
      </p>
    </div>
  </div>

  <!-- Content section -->
  <div class="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
      <div
        class="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2"
      >
        <div>
          <p>
            Welcome! I'm Ryan Viers, a full-stack web developer with a
            knack for building interactive, responsive, and robust
            websites. With an eye for design and a penchant for code, I'm
            passionate about translating unique business needs into
            seamless digital solutions. You could say I'm in the business
            of making the web a better place, one project at a time.
          </p>
          <p class="mt-8">
            In a world where digital presence is no longer optional, I
            understand the importance of crafting user-friendly,
            accessible, and visually appealing web solutions. I believe
            that every line of code should tell a story and every webpage
            should be a testament to functionality and aesthetics working
            hand in hand.
          </p>
        </div>
        <div>
          <p>
            This website serves as a window into my work, providing you
            with a taste of the many projects that I've had the pleasure
            of bringing to life. Each one represents a unique
            problem-solving journey, a chance to innovate, and an
            opportunity to make a positive impact on a user's online
            journey.
          </p>
          <p class="mt-8">
            SFeel free to explore my portfolio. If my approach aligns with
            your vision, or if you're intrigued by the possibilities of
            what we could accomplish together, I encourage you to reach
            out. I'm always looking for new opportunities to collaborate
            and create something remarkable.
          </p>
        </div>
      </div>
    </div>
  </div>`,
})
export class AboutHeaderComponent {
}
