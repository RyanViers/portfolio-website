import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokedexStore } from './pokedex.service';
import { PokemonCard } from './components/pokemon-card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [RouterLink, PokemonCard, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gray-950 flex flex-col">
      <app-header />

      <main class="flex-1">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <!-- Back link + title -->
          <div class="mb-8">
            <a routerLink="/apps" class="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors mb-4 inline-block">
              &larr; Back to Apps
            </a>
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-100 mb-2">Pokedex</h1>
            <p class="text-gray-500">Browse and search the original 151 Pokemon.</p>
          </div>

          <!-- Search -->
          <div class="mb-8">
            <input
              type="text"
              placeholder="Search Pokemon..."
              (input)="onSearch($event)"
              class="w-full max-w-md rounded-lg border border-gray-700 bg-gray-900 px-4 py-2.5
                     text-sm text-gray-200 placeholder:text-gray-600
                     focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>

          <!-- Loading -->
          @if (store.pokemonList.isLoading()) {
            <div class="flex justify-center py-20">
              <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-cyan-400"></div>
            </div>
          } @else {
            <!-- Grid -->
            @if (store.$pagedPokemon().length) {
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                @for (pokemon of store.$pagedPokemon(); track pokemon.id) {
                  <app-pokemon-card [pokemon]="pokemon" (selected)="onSelect($event)" />
                }
              </div>

              <!-- Pagination -->
              <div class="flex items-center justify-center gap-4">
                <button
                  (click)="store.prevPage()"
                  [disabled]="!store.$hasPrev()"
                  class="rounded-lg border border-gray-700 px-4 py-2 text-sm font-mono text-gray-400
                         hover:border-gray-500 hover:text-gray-200 transition-colors
                         disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <span class="text-sm font-mono text-gray-500">
                  {{ store.$currentPage() + 1 }} / {{ store.$totalPages() }}
                </span>
                <button
                  (click)="store.nextPage()"
                  [disabled]="!store.$hasNext()"
                  class="rounded-lg border border-gray-700 px-4 py-2 text-sm font-mono text-gray-400
                         hover:border-gray-500 hover:text-gray-200 transition-colors
                         disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            } @else {
              <p class="text-center text-gray-500 py-20">No Pokemon found.</p>
            }
          }
        </div>
      </main>

      <app-footer />

      <!-- Detail Modal -->
      @if (store.pokemonDetail.value(); as detail) {
        <div
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          (click)="store.closeDetail()"
        >
          <div
            class="w-full max-w-md rounded-2xl bg-gray-900 border border-gray-700 p-6 scale-in"
            (click)="$event.stopPropagation()"
          >
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="text-xs font-mono text-gray-500">#{{ detail.id }}</p>
                <h2 class="text-2xl font-bold text-gray-100 capitalize">{{ detail.name }}</h2>
              </div>
              <button
                (click)="store.closeDetail()"
                class="text-gray-500 hover:text-gray-300 transition-colors text-xl leading-none cursor-pointer"
              >
                &times;
              </button>
            </div>

            <!-- Sprite + types -->
            <div class="flex items-center gap-6 mb-6">
              <img [src]="detail.sprite" [alt]="detail.name" class="h-28 w-28" />
              <div>
                <div class="flex gap-2 mb-3">
                  @for (type of detail.types; track type) {
                    <span class="rounded-full px-3 py-0.5 text-xs font-semibold capitalize bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                      {{ type }}
                    </span>
                  }
                </div>
                <p class="text-xs text-gray-500">Height: {{ detail.height / 10 }}m &middot; Weight: {{ detail.weight / 10 }}kg</p>
              </div>
            </div>

            <!-- Stats -->
            <div class="space-y-2 mb-6">
              @for (stat of detail.stats; track stat.name) {
                <div class="flex items-center gap-3">
                  <span class="w-28 text-xs font-mono text-gray-500 capitalize truncate">{{ stat.name }}</span>
                  <div class="flex-1 h-2 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      class="h-full rounded-full bg-cyan-500 transition-all duration-500"
                      [style.width.%]="(stat.value / 255) * 100"
                    ></div>
                  </div>
                  <span class="w-8 text-right text-xs font-mono text-gray-400">{{ stat.value }}</span>
                </div>
              }
            </div>

            <!-- Abilities -->
            <div>
              <p class="text-xs font-mono text-gray-500 mb-2">Abilities</p>
              <div class="flex flex-wrap gap-2">
                @for (ability of detail.abilities; track ability) {
                  <span class="text-xs font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300 capitalize">
                    {{ ability }}
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export default class Pokedex {
  store = inject(PokedexStore);

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.store.search(value);
  }

  onSelect(id: number) {
    this.store.selectPokemon(id);
  }
}
