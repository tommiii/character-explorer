import type { CharacterListItem } from '~/types/rick-and-morty'
import RickAndMortyGrid from '@/components/RickAndMorty/RickAndMortyGrid.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

const mockRouter = {
  push: vi.fn(),
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}))

describe('rickAndMortyGrid', () => {
  const mockCharacters: CharacterListItem[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
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
      type: '',
      gender: 'Male',
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
      stubs: {
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

  it('shows loading state when loading prop is true', () => {
    const wrapper = mount(RickAndMortyGrid, {
      props: {
        characters: [],
        loading: true,
      },
      ...mountOptions,
    })

    expect(wrapper.find('.i-heroicons-arrow-path').exists()).toBe(true)
  })

  it('shows empty state when no characters are provided', () => {
    const wrapper = mount(RickAndMortyGrid, {
      props: {
        characters: [],
        loading: false,
      },
      ...mountOptions,
    })

    expect(wrapper.text()).toContain('No data available')
  })

  it('renders character cards correctly', () => {
    const wrapper = mount(RickAndMortyGrid, {
      props: {
        characters: mockCharacters,
        loading: false,
      },
      ...mountOptions,
    })

    const cards = wrapper.findAll('.bg-white')
    expect(cards).toHaveLength(2)

    // Check first character card content
    const firstCard = cards[0]!
    const img = firstCard.find('img')
    expect(img.exists()).toBe(true)
    // @ts-expect-error - we know img exists after checking above
    expect(img.html()).toContain(`src="${mockCharacters[0].image}"`)
    // @ts-expect-error - we know img exists after checking above
    expect(img.html()).toContain(`alt="${mockCharacters[0].name}"`)
    expect(firstCard.text()).toContain('Rick Sanchez')
    expect(firstCard.text()).toContain('Alive')
    expect(firstCard.text()).toContain('Human')
    expect(firstCard.text()).toContain('Earth (C-137)')

    // Check status badges
    const badges = wrapper.findAll('.u-badge')
    expect(badges[0]!.classes()).toContain('green') // Alive status
    expect(badges[2]!.classes()).toContain('red') // Dead status
  })

  it('navigates to character details when clicking the details button', async () => {
    const wrapper = mount(RickAndMortyGrid, {
      props: {
        characters: mockCharacters,
        loading: false,
      },
      ...mountOptions,
    })

    const detailsButton = wrapper.find('.u-button')
    expect(detailsButton.exists()).toBe(true)
    await detailsButton.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/rick-and-morty/1')
  })
})
