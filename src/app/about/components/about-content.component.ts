import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-content',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  template: `<!-- Image section -->
    <div class="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
      <img
        src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80"
        loading="lazy"
        class="aspect-[9/4] w-full object-cover xl:rounded-3xl"
      />
    </div>

    <!-- Values section -->
    <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Values: The Pillars of My Approach
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Anchoring every project with a strong set of core principles
        </p>
      </div>
      <dl
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16"
      >
        <div class="relative pl-9">
          <dt class="inline font-semibold text-white">
            <svg
              class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002zM13 9a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            Be world-class.
          </dt>
          <dd class="inline">
            My aim is to consistently deliver top-tier results, grounded in
            thorough research, efficient code, and innovative problem-solving.
          </dd>
        </div>
        <div class="relative pl-9">
          <dt class="inline font-semibold text-white">
            <svg
              class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M11 2a1 1 0 10-2 0v6.5a.5.5 0 01-1 0V3a1 1 0 10-2 0v5.5a.5.5 0 01-1 0V5a1 1 0 10-2 0v7a7 7 0 1014 0V8a1 1 0 10-2 0v3.5a.5.5 0 01-1 0V3a1 1 0 10-2 0v5.5a.5.5 0 01-1 0V2z"
                clip-rule="evenodd"
              />
            </svg>
            Take responsibility.
          </dt>
          <dd class="inline">
            Take Responsibility: Owning every line of code and every project
            outcome is crucial. From brainstorming to debugging, I am committed
            to ensuring the highest quality results.
          </dd>
        </div>
        <div class="relative pl-9">
          <dt class="inline font-semibold text-white">
            <svg
              class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z"
              />
            </svg>
            Be supportive.
          </dt>
          <dd class="inline">
            I believe in cultivating an environment of collaboration and open
            communication, where every idea is valued and constructive feedback
            propels us forward.
          </dd>
        </div>
        <div class="relative pl-9">
          <dt class="inline font-semibold text-white">
            <svg
              class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z"
                clip-rule="evenodd"
              />
            </svg>
            Always learning.
          </dt>
          <dd class="inline">
            The tech landscape is ever-evolving, and so am I. I continually
            strive to broaden my knowledge and skills, staying current with the
            latest trends and technologies.
          </dd>
        </div>
        <div class="relative pl-9">
          <dt class="inline font-semibold text-white">
            <svg
              class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684zM13.949 13.684a1 1 0 00-1.898 0l-.184.551a1 1 0 01-.632.633l-.551.183a1 1 0 000 1.898l.551.183a1 1 0 01.633.633l.183.551a1 1 0 001.898 0l.184-.551a1 1 0 01.632-.633l.551-.183a1 1 0 000-1.898l-.551-.184a1 1 0 01-.633-.632l-.183-.551z"
              />
            </svg>
            Share everything you know.
          </dt>
          <dd class="inline">
            Transparency is key in my work ethic. I believe in sharing knowledge
            and insights, fostering mutual growth, and creating a stronger
            development community.
          </dd>
        </div>
        <div class="relative pl-9">
          <dt class="inline font-semibold text-white">
            <svg
              class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"
              />
            </svg>
            Enjoy downtime.
          </dt>
          <dd class="inline">
            Balancing work and relaxation is important for consistent
            productivity. I value the refreshing power of downtime, fostering
            creativity, and maintaining work-life harmony.
          </dd>
        </div>
      </dl>
    </div>`,
})
export class AboutContentComponent {}
