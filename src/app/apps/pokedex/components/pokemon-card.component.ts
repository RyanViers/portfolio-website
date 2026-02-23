import { Component, input, output } from '@angular/core';
import { PokemonListItem } from '../pokedex.models';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  template: `
    <button
      (click)="selected.emit(pokemon().id)"
      class="group w-full rounded-xl bg-gray-900 border border-gray-800 p-4 text-center
             hover:border-cyan-500/40 hover:bg-gray-800/80 transition-all duration-200 cursor-pointer"
    >
      <img
        [src]="pokemon().sprite"
        [alt]="pokemon().name"
        class="mx-auto h-20 w-20 group-hover:scale-110 transition-transform duration-200"
        loading="lazy"
      />
      <p class="mt-2 text-xs font-mono text-gray-500">#{{ pokemon().id }}</p>
      <p class="text-sm font-semibold text-gray-200 capitalize">{{ pokemon().name }}</p>
    </button>
  `,
})
export class PokemonCard {
  pokemon = input.required<PokemonListItem>();
  selected = output<number>();
}
