export interface PokemonListItem {
  id: number;
  name: string;
  sprite: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  abilities: string[];
  stats: { name: string; value: number }[];
  height: number;
  weight: number;
}
