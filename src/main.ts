/**
 * Games API - A TypeScript wrapper for gaming APIs
 *
 * This library provides access to gaming data APIs using TheGamesDB
 * interface as the baseline. All providers return data in TGDB format.
 *
 * @example
 * ```typescript
 * import { createGamesApiClient } from 'games-api'
 *
 * const client = createGamesApiClient({
 *   provider: 'tgdb',
 *   apiKey: 'your-api-key'
 * })
 *
 * const response = await client.gamesByGameName({ name: 'Mario' })
 * const platforms = await client.platforms()
 * ```
 */

// Main client factory and types
export { createGamesApiClient, createTgdbClient, GamesApiError } from './client'

export type {
  GamesApiConfig,
  GamesApiClient,
  Provider,
  BaseConfig,
  Game,
  Platform,
  PlatformSkinny,
  Genre,
  Developer,
  Publisher,
  GameImage,
  PlatformImage,
  UpdateModel,
  GamesByIdResponse,
  GamesByNameV1Response,
  GamesImagesResponse,
  GamesUpdatesResponse,
  PlatformsResponse,
  PlatformsByIdResponse,
  PlatformsByNameResponse,
  PlatformImagesResponse,
  GenresResponse,
  DevelopersResponse,
  PublishersResponse,
  GameFields,
  GameIncludes,
  PlatformFields,
  GameImageTypes,
  PlatformImageTypes,
  BaseApiResponse,
  PaginatedApiResponse,
  ImageBaseUrlMeta,
} from './client'

// Provider-specific exports
export { TgdbClient } from './providers/tgdb'
export type { TgdbConfig } from './providers/tgdb'

// Shared utilities (for advanced users)
export { HttpClient } from './shared/http-client'
export type { HttpClientConfig } from './shared/http-client'
