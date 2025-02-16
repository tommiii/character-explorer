import PokemonGrid from '@/components/Pokemon/PokemonGrid.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

const mockRouter = {
  push: vi.fn(),
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}))

describe('pokemonGrid', () => {
  const mockItems = [
    {
      id: 1,
      name: 'bulbasaur',
      image: 'https://example.com/bulbasaur.png',
    },
    {
      id: 25,
      name: 'pikachu',
      image: 'https://example.com/pikachu.png',
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
      },
    },
  }

  it('shows loading state when loading prop is true', () => {
    const wrapper = mount(PokemonGrid, {
      props: {
        items: [],
        loading: true,
      },
      ...mountOptions,
    })

    expect(wrapper.find('.i-heroicons-arrow-path').exists()).toBe(true)
  })

  it('shows empty state when no items are provided', () => {
    const wrapper = mount(PokemonGrid, {
      props: {
        items: [],
        loading: false,
      },
      ...mountOptions,
    })

    expect(wrapper.text()).toContain('No data available')
  })

  it('renders pokemon cards correctly', () => {
    const wrapper = mount(PokemonGrid, {
      props: {
        items: mockItems,
        loading: false,
      },
      ...mountOptions,
    })

    const cards = wrapper.findAll('.bg-white')
    expect(cards).toHaveLength(2)

    // Check first pokemon card content
    const firstCard = cards[0]!
    const img = firstCard.find('img')!
    const imgAttrs = img.attributes()!
    expect(imgAttrs.src!).toBe(mockItems[0].image)
    expect(imgAttrs.alt!).toBe(mockItems[0].name)
    expect(firstCard.text()).toContain('bulbasaur')
    expect(firstCard.text()).toContain('#001')
  })

  it('navigates to pokemon details when clicking the details button', async () => {
    const wrapper = mount(PokemonGrid, {
      props: {
        items: mockItems,
        loading: false,
      },
      ...mountOptions,
    })

    const detailsButton = wrapper.find('.u-button')
    expect(detailsButton.exists()).toBe(true)
    await detailsButton.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/pokemon/1')
  })
})
