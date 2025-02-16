import PokemonTable from '@/components/Pokemon/PokemonTable.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { computed } from 'vue'

// Mock Nuxt components
const mockNuxtLink = {
  template: '<a><slot /></a>',
  props: ['to'],
}

describe('pokemonTable', () => {
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
      components: {
        NuxtLink: mockNuxtLink,
      },
      stubs: {
        UTable: {
          template: `
            <div class="u-table">
              <slot v-if="loading" name="loading" />
              <slot v-else-if="!rows.length" name="empty-state" />
              <template v-else>
                <div v-for="row in rows" :key="row.id" class="table-row">
                  <slot name="image-data" :row="row" />
                  <div class="name-cell">{{ row.name }}</div>
                  <slot name="actions-data" :row="row" />
                </div>
              </template>
            </div>
          `,
          props: ['rows', 'columns', 'loading'],
        },
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
    const wrapper = mount(PokemonTable, {
      props: {
        items: [],
        loading: true,
      },
      ...mountOptions,
    })

    expect(wrapper.find('.i-heroicons-arrow-path').exists()).toBe(true)
  })

  it('shows empty state when no items are provided', () => {
    const wrapper = mount(PokemonTable, {
      props: {
        items: [],
        loading: false,
      },
      ...mountOptions,
    })

    expect(wrapper.text()).toContain('No data available')
  })

  it('renders pokemon data correctly', () => {
    const wrapper = mount(PokemonTable, {
      props: {
        items: mockItems,
        loading: false,
      },
      ...mountOptions,
    })

    // Check if images are rendered correctly
    const images = wrapper.findAll('img')
    expect(images).toHaveLength(2)
    const firstImage = images[0]!
    const firstImageAttrs = firstImage.attributes()!
    expect(firstImageAttrs.src).toBe(mockItems[0].image)
    expect(firstImageAttrs.alt).toBe('Bulbasaur') // Name should be capitalized

    // Check if names are rendered and capitalized
    const nameElements = wrapper.findAll('.name-cell')
    expect(nameElements[0]!.text()).toBe('Bulbasaur')
    expect(nameElements[1]!.text()).toBe('Pikachu')

    // Check if details buttons are rendered with correct links
    const buttons = wrapper.findAll('.u-button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]!.text()).toBe('Details')
  })
})
