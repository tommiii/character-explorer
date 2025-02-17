# Vue.js/Nuxt.js Assignment

A Vue.js application showcasing data visualization from the Pokémon API and Rick and Morty API. Built with Nuxt 3, Vue Query, and Nuxt UI.

## Features

- **Pokémon List**

  - View Pokémon in both table and grid layouts
  - Pagination support
  - Detailed view for each Pokémon
  - Responsive design

- **Rick and Morty Characters**
  - Character listing in table and grid views
  - Advanced filtering options
  - Pagination
  - Detailed character information
  - Responsive design

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - The Vue.js Framework
- [Vue Query](https://tanstack.com/query/latest) - Data fetching and caching
- [Nuxt UI](https://ui.nuxt.com/) - UI components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vitest](https://vitest.dev/) - Unit testing
- [Vue Test Utils](https://test-utils.vuejs.org/) - Vue component testing
- [TailwindCSS](https://tailwindcss.com/) - Styling

## Prerequisites

- Node.js (v18 or later recommended)
- pnpm (v9 or later)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd character-explorer
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm lint` - Run linter
- `pnpm typecheck` - Run type checking

## Project Structure

```
├── app/
│   ├── components/     # Vue components
│   ├── constants/      # Constants and enums
│   ├── pages/         # Page components (Nuxt routing)
│   ├── plugins/       # Nuxt plugins
│   └── types/         # TypeScript type definitions
├── tests/
│   ├── components/    # Component tests
│   └── pages/        # Page tests
├── public/           # Static files
└── nuxt.config.ts    # Nuxt configuration
```

## Testing

The project uses Vitest for unit testing. Tests are located in the `tests` directory, mirroring the structure of the `app` directory.

To run tests:

```bash
pnpm test
```

## API Integration

The application integrates with two external APIs:

- [PokéAPI](https://pokeapi.co/) - For Pokémon data
- [Rick and Morty API](https://rickandmortyapi.com/) - For Rick and Morty character data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
