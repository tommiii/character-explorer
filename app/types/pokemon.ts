// List view Pokemon type
export interface PokemonListItem {
  id: string
  name: string
  url: string
  image: string
}

// Detail view Pokemon types
export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonSprites {
  front_default: string
  back_default: string
  front_shiny: string
  back_shiny: string
  other: {
    'official-artwork': {
      front_default: string
    }
  }
}

export interface Pokemon {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  abilities: PokemonAbility[]
  types: PokemonType[]
  stats: PokemonStat[]
  sprites: PokemonSprites
  species: {
    name: string
    url: string
  }
}

export interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string
    language: {
      name: string
    }
  }>
  genera: Array<{
    genus: string
    language: {
      name: string
    }
  }>
}
