export const POKEMON_PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

export const POKEMON_TABLE_COLUMNS = [
  {
    key: 'id',
    label: '#',
    class: 'w-16',
  },
  {
    key: 'image',
    label: '',
    class: 'w-[100px]',
  },
  {
    key: 'name',
    label: 'Name',
    class: 'min-w-[200px]',
  },
  {
    key: 'actions',
    label: 'Actions',
    class: 'w-[100px] text-center',
  },
]

export const POKEMON_GRID_CONFIG = {
  itemName: 'Pokémon',
  detailsPath: '/pokemon',
  imageClass: 'object-contain',
  imageContainerClass: 'bg-gray-50 dark:bg-gray-900',
}

export const POKEMON_TABLE_CONFIG = {
  ...POKEMON_GRID_CONFIG,
  imageClass: 'w-20 h-20 object-contain',
}
