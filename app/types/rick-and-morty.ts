// List view Character type
export interface CharacterLocation {
  name: string
  url: string
}

export interface CharacterListItem {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: string[]
  url: string
  created: string
}

// Detail view Character types
export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface Episode {
  id: string
  name: string
  episode: string
  air_date: string
}

export interface RickAndMortyApiInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface RickAndMortyApiResponse {
  info: RickAndMortyApiInfo
  results: CharacterListItem[]
}
