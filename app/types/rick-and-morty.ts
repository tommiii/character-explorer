// List view Character type
export interface CharacterListItem {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  image: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
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
