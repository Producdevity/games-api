# Games API

A TypeScript/Node.js wrapper for gaming APIs using TheGamesDB interface as the baseline.

## Overview

This library provides access to multiple gaming data APIs using a consistent interface based on TheGamesDB's API structure. All providers return data in TheGamesDB format, ensuring consistent data structures across different backends.

Currently supported providers:

- ✅ **TheGamesDB** - Fully implemented
- 🚧 **RAWG.io** - Coming soon
- 🚧 **IGDB** - Coming soon

## Features

- 🎯 **TGDB-based Interface** - All providers use TheGamesDB's proven API structure
- 📦 **Full TypeScript Support** - Complete type definitions with IntelliSense
- 🔄 **Provider Abstraction** - Switch between data sources without changing code
- 🛡️ **Type Safety** - Comprehensive TypeScript interfaces and validation
- ⚡ **Modern Architecture** - Built with ESM/CommonJS dual support
- 📚 **Comprehensive Documentation** - Detailed JSDoc comments and examples

## Installation

```bash
npm install games-api
```

## Quick Start

```typescript
import { createGamesApiClient } from 'games-api'

// Create a client (currently only TGDB supported)
const client = createGamesApiClient({
  provider: 'tgdb',
  apiKey: 'your-thegamesdb-api-key', // Get from https://thegamesdb.net/
})

// Search for games
const response = await client.gamesByGameName({
  name: 'Super Mario',
  fields: 'overview,rating',
  include: 'boxart,platform',
})

console.log(`Found ${response.data.count} games`)
response.data.games.forEach((game) => {
  console.log(`${game.game_title} - ${game.release_date}`)
})
```

## API Reference

All methods follow TheGamesDB's API structure. See the [TheGamesDB API documentation](https://thegamesdb.net/api/) for detailed parameter descriptions.

### Games

#### `gamesByGameId(params)`

Fetch game(s) by ID.

```typescript
const response = await client.gamesByGameId({
  id: '1,2,3', // comma-separated game IDs
  fields: 'overview,rating,developers',
  include: 'boxart,platform',
})
```

#### `gamesByGameName(params)`

Search for games by name.

```typescript
const response = await client.gamesByGameName({
  name: 'Zelda',
  'filter[platform]': '7', // Nintendo 64
  fields: 'overview,rating',
  include: 'boxart',
})
```

#### `gamesByPlatformId(params)`

Get games for a specific platform.

```typescript
const response = await client.gamesByPlatformId({
  id: '7', // Nintendo 64
  fields: 'overview,rating',
  page: 1,
})
```

#### `gamesImages(params)`

Get images for game(s).

```typescript
const response = await client.gamesImages({
  games_id: '1,2',
  'filter[type]': 'boxart,screenshot',
})
```

### Platforms

#### `platforms(params?)`

Get all available platforms.

```typescript
const response = await client.platforms({
  fields: 'icon,console,developer',
})
```

#### `platformsByPlatformId(params)`

Get platform(s) by ID.

```typescript
const response = await client.platformsByPlatformId({
  id: 7,
  fields: 'overview,developer',
})
```

#### `platformsByPlatformName(params)`

Search platforms by name.

```typescript
const response = await client.platformsByPlatformName({
  name: 'Nintendo',
  fields: 'overview',
})
```

### Other Endpoints

```typescript
// Get all genres
const genres = await client.genres()

// Get all developers
const developers = await client.developers()

// Get all publishers
const publishers = await client.publishers()
```

## Data Structures

All responses follow TheGamesDB's format:

### Game

```typescript
interface Game {
  id: number
  game_title: string
  release_date?: string
  platform?: number
  players?: number
  overview?: string
  last_updated?: string
  rating?: string
  coop?: string
  youtube?: string
  developers?: number[]
  genres?: number[]
  publishers?: number[]
  alternates?: string[]
  // ... other TGDB fields
}
```

### Response Format

```typescript
interface GamesByIdResponse extends PaginatedApiResponse {
  data: {
    count: number
    games: Game[]
  }
  include: {
    boxart: {
      base_url: ImageBaseUrlMeta
      data: Record<string, GameImage[]>
    }
    platform: {
      data: Record<string, PlatformSkinny>
    }
  }
}
```

## Available Fields and Includes

### Game Fields

- `players`, `publishers`, `genres`, `overview`, `last_updated`, `rating`
- `platform`, `coop`, `youtube`, `os`, `processor`, `ram`, `hdd`, `video`, `sound`, `alternates`

### Game Includes

- `boxart`, `platform`

### Platform Fields

- `icon`, `console`, `controller`, `developer`, `manufacturer`, `media`
- `cpu`, `memory`, `graphics`, `sound`, `maxcontrollers`, `display`, `overview`, `youtube`

## Error Handling

```typescript
import { GamesApiError } from 'games-api'

try {
  const response = await client.gamesByGameName({ name: 'Mario' })
} catch (error) {
  if (error instanceof GamesApiError) {
    console.error(`API Error [${error.provider}]:`, error.message)
    console.error('Status Code:', error.statusCode)
  }
}
```

## Configuration

### TheGamesDB

```typescript
const client = createTgdbClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.thegamesdb.net', // optional
  timeout: 10000, // optional, default 10s
})
```

## Examples

See the [examples](./examples/) directory for complete usage examples:

- [Basic Usage](./examples/tgdb/basic-usage.ts) - Complete API demonstration

## Architecture

The library uses TheGamesDB's interface as the baseline:

1. **TGDB Provider** - Returns native TGDB responses
2. **Future Providers** - Will transform their data to match TGDB format
3. **Consistent Interface** - Same API shape regardless of provider
4. **Type Safety** - Full TypeScript support with TGDB-based types

## Building

```bash
npm run build      # Build the library
npm run dev        # Watch mode
npm run typecheck  # Type checking
npm run lint       # Linting
```

## License

MIT

## Contributing

Contributions welcome! The library is designed with TGDB as the baseline interface. New providers should transform their data to match TheGamesDB's structure.
