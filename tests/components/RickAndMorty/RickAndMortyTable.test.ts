import type { CharacterListItem } from '~/types/rick-and-morty'
import RickAndMortyTable from '@/components/RickAndMorty/RickAndMortyTable.vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock window resize
const addEventListener = vi.fn()
const removeEventListener = vi.fn()
const mockWindow = {
  innerWidth: 1024,
  addEventListener,
  removeEventListener,
  dispatchEvent: vi.fn(),
}

vi.stubGlobal('window', mockWindow)

// Mock Nuxt components
const mockNuxtLink = {
  template: '<a><slot /></a>',
  props: ['to'],
}

describe('rickAndMortyTable', () => {
  const mockCharacters: CharacterListItem[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      type: '',
      image: 'https://example.com/rick.png',
      origin: {
        name: 'Earth (C-137)',
        url: '',
      },
      location: {
        name: 'Earth',
        url: '',
      },
      episode: [],
      url: '',
      created: '',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Dead',
      species: 'Human',
      gender: 'Male',
      type: '',
      image: 'https://example.com/morty.png',
      origin: {
        name: 'Earth (C-137)',
        url: '',
      },
      location: {
        name: 'Earth',
        url: '',
      },
      episode: [],
      url: '',
      created: '',
    },
  ]

  const mountOptions = {
    global: {
      components: {
        NuxtLink: mockNuxtLink,
      },
      stubs: {
        UTable: {
          template: '<div class="u-table"><slot v-if="loading" name="loading" /><slot v-else-if="!rows.length" name="empty-state" /><template v-else><div v-for="row in rows" :key="row.id" class="table-row"><slot name="image-data" :row="row" /><div class="name-cell">{{ row.name }}</div><div class="status-cell">{{ row.status }}</div><div class="species-cell">{{ row.species }}</div><div class="gender-cell">{{ row.gender }}</div><slot name="origin-data" :row="row" /><slot name="actions-data" :row="row" /></div></template></div>',
          props: ['rows', 'columns', 'loading'],
        },
        UButton: {
          template: '<button class="u-button"><slot /></button>',
        },
        UIcon: {
          template: '<span class="u-icon" :class="$attrs.name"><slot /></span>',
          inheritAttrs: false,
        },
        UBadge: {
          template: '<span class="u-badge" :class="color"><slot /></span>',
          props: ['color'],
        },
      },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockWindow.innerWidth = 1024 // Reset to desktop view
  })

  it('shows loading state when loading prop is true', () => {
    const wrapper = mount(RickAndMortyTable, {
      props: {
        characters: [],
        loading: true,
      },
      ...mountOptions,
    })

    expect(wrapper.find('.i-heroicons-arrow-path').exists()).toBe(true)
  })

  it('shows empty state when no characters are provided', () => {
    const wrapper = mount(RickAndMortyTable, {
      props: {
        characters: [],
        loading: false,
      },
      ...mountOptions,
    })

    expect(wrapper.text()).toContain('No data available')
  })

  it('renders character data in desktop view correctly', () => {
    const wrapper = mount(RickAndMortyTable, {
      props: {
        characters: mockCharacters,
        loading: false,
      },
      ...mountOptions,
    })

    // Check if table rows are rendered
    const rows = wrapper.findAll('.table-row')
    expect(rows).toHaveLength(2)

    // Check first character row content
    const firstRow = rows[0]!
    expect(firstRow.find('.name-cell').text()).toBe('Rick Sanchez')
    expect(firstRow.find('.status-cell').text()).toBe('Alive')
    expect(firstRow.find('.species-cell').text()).toBe('Human')
    expect(firstRow.find('.gender-cell').text()).toBe('Male')

    // Check images
    const images = wrapper.findAll('img')
    expect(images).toHaveLength(2)
    const firstImage = images[0]
    // @ts-expect-error - we know firstImage exists since we checked length above
    expect(firstImage.exists()).toBe(true)
    // @ts-expect-error - we know firstImage exists after checking above
    expect(firstImage.html()).toContain(`src="${mockCharacters[0].image}"`)
    // @ts-expect-error - we know firstImage exists after checking above
    expect(firstImage.html()).toContain(`alt="${mockCharacters[0].name}"`)
  })

  it('switches to mobile view when window width is less than 640px', async () => {
    // Start with desktop width
    mockWindow.innerWidth = 1024
    const wrapper = mount(RickAndMortyTable, {
      props: {
        characters: mockCharacters,
        loading: false,
      },
      ...mountOptions,
    })

    // Verify resize listener is added
    expect(addEventListener).toHaveBeenCalledWith('resize', expect.any(Function))

    // Get the resize handler and call it directly
    // @ts-expect-error - we know the mock has been called because we checked above
    const resizeHandler = addEventListener.mock.calls[0][1] as () => void

    // Simulate mobile width and trigger resize
    mockWindow.innerWidth = 375
    resizeHandler()
    await wrapper.vm.$nextTick()

    // Check if mobile cards are rendered
    const mobileCards = wrapper.findAll('.bg-white.dark\\:bg-stone-800')
    expect(mobileCards).toHaveLength(2)

    // Check mobile card content
    const firstCard = mobileCards[0]!
    expect(firstCard.text()).toContain('Rick Sanchez')
    expect(firstCard.text()).toContain('Alive')
    expect(firstCard.text()).toContain('Human')
    expect(firstCard.text()).toContain('Earth (C-137)')

    // Check if table is not visible
    expect(wrapper.find('.u-table').exists()).toBe(false)

    // Verify resize listener is removed on unmount
    wrapper.unmount()
    expect(removeEventListener).toHaveBeenCalledWith('resize', resizeHandler)
  })
})
