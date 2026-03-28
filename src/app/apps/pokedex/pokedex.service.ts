import { Injectable, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { PokemonDetail, PokemonListItem } from './pokedex.models';

interface PokeApiListResponse {
  count: number;
  results: { name: string; url: string }[];
}

interface PokeApiPokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
}

const PAGE_SIZE = 24;
const API = 'https://pokeapi.co/api/v2';

@Injectable({ providedIn: 'root' })
export class PokedexStore {
  private $searchQuery = signal('');
  private $page = signal(0);
  private $selectedId = signal<number | null>(null);

  pokemonList = httpResource<PokemonListItem[]>(() => `${API}/pokemon?limit=151&offset=0`, {
    defaultValue: [],
    parse: (res: unknown) => {
      const data = res as PokeApiListResponse;
      return data.results.map((p, i) => {
        const id = i + 1;
        return {
          id,
          name: p.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });
    },
  });

  pokemonDetail = httpResource<PokemonDetail | undefined>(
    () => {
      const id = this.$selectedId();
      return id ? `${API}/pokemon/${id}` : undefined;
    },
    {
      defaultValue: undefined,
      parse: (raw: unknown) => {
        const data = raw as PokeApiPokemon;
        return {
          id: data.id,
          name: data.name,
          sprite: data.sprites.front_default,
          types: data.types.map(t => t.type.name),
          abilities: data.abilities.map(a => a.ability.name),
          stats: data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
          height: data.height,
          weight: data.weight,
        };
      },
    },
  );

  $filtered = computed(() => {
    const query = this.$searchQuery().toLowerCase();
    const all = this.pokemonList.value();
    return query ? all.filter(p => p.name.includes(query)) : all;
  });

  $pagedPokemon = computed(() => {
    const start = this.$page() * PAGE_SIZE;
    return this.$filtered().slice(start, start + PAGE_SIZE);
  });

  $currentPage = computed(() => this.$page());
  $totalPages = computed(() => Math.ceil(this.$filtered().length / PAGE_SIZE));
  $hasNext = computed(() => this.$page() < this.$totalPages() - 1);
  $hasPrev = computed(() => this.$page() > 0);

  search(query: string) {
    this.$searchQuery.set(query);
    this.$page.set(0);
  }

  nextPage() {
    if (this.$hasNext()) this.$page.update(p => p + 1);
  }

  prevPage() {
    if (this.$hasPrev()) this.$page.update(p => p - 1);
  }

  selectPokemon(id: number) {
    this.$selectedId.set(id);
  }

  closeDetail() {
    this.$selectedId.set(null);
  }
}
