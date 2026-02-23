import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
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
  private http = inject(HttpClient);

  private $allPokemon = signal<PokemonListItem[]>([]);
  private $searchQuery = signal('');
  private $page = signal(0);
  $selectedDetail = signal<PokemonDetail | null>(null);
  $detailLoading = signal(false);

  $filtered = computed(() => {
    const query = this.$searchQuery().toLowerCase();
    const all = this.$allPokemon();
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
  $loading = signal(true);

  async loadPokemon() {
    this.$loading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.get<PokeApiListResponse>(`${API}/pokemon?limit=151&offset=0`)
      );
      const list: PokemonListItem[] = res.results.map((p, i) => {
        const id = i + 1;
        return {
          id,
          name: p.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });
      this.$allPokemon.set(list);
    } finally {
      this.$loading.set(false);
    }
  }

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

  async selectPokemon(id: number) {
    this.$detailLoading.set(true);
    try {
      const data = await firstValueFrom(
        this.http.get<PokeApiPokemon>(`${API}/pokemon/${id}`)
      );
      this.$selectedDetail.set({
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map(t => t.type.name),
        abilities: data.abilities.map(a => a.ability.name),
        stats: data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
        height: data.height,
        weight: data.weight,
      });
    } finally {
      this.$detailLoading.set(false);
    }
  }

  closeDetail() {
    this.$selectedDetail.set(null);
  }
}
