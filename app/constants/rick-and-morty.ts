export const RICK_AND_MORTY_PAGE_SIZE = 20 // API has fixed page size

export const RICK_AND_MORTY_TABLE_COLUMNS = [
  {
    key: 'id',
    label: '#',
    class: 'w-16 hidden sm:table-cell',
  },
  {
    key: 'image',
    label: '',
    class: 'w-[80px]',
  },
  {
    key: 'name',
    label: 'Character',
    class: 'w-[180px]',
  },
  {
    key: 'status',
    label: 'Status',
    class: 'w-[100px] hidden sm:table-cell',
  },
  {
    key: 'species',
    label: 'Species',
    class: 'w-[120px] hidden md:table-cell',
  },
  {
    key: 'gender',
    label: 'Gender',
    class: 'w-[100px] hidden lg:table-cell',
  },
  {
    key: 'origin',
    label: 'Origin',
    class: 'min-w-[160px] hidden md:table-cell',
  },
  {
    key: 'actions',
    label: 'Actions',
    class: 'w-[100px] text-center',
  },
]

