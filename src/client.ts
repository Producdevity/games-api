/**
 * Main Games API Client Factory
 * 
 * This module provides a way to create API clients for different
 * gaming data providers using TheGamesDB interface as the baseline.
 */

import { GamesApiClient, Provider, BaseConfig } from './shared/types'
import { TgdbClient, TgdbConfig } from './providers/tgdb'

/**
 * Configuration for different providers
 */
export interface GamesApiConfig extends BaseConfig {
  provider: Provider
}

/**
 * Create a games API client for the specified provider
 * 
 * All providers implement the TheGamesDB interface, so responses
 * follow TGDB's structure regardless of the underlying provider.
 * 
 * @param config - Configuration including provider and API key
 * @returns API client instance for the specified provider
 * 
 * @example
 * ```typescript
 * // Create a TheGamesDB client
 * const client = createGamesApiClient({
 *   provider: 'tgdb',
 *   apiKey: 'your-tgdb-api-key'
 * })
 * 
 * // Use the TGDB interface
 * const response = await client.gamesByGameName({ name: 'Mario' })
 * const platforms = await client.platforms()
 * ```
 */
export function createGamesApiClient(config: GamesApiConfig): GamesApiClient {
  switch (config.provider) {
    case 'tgdb':
      return new TgdbClient(config as TgdbConfig)
    
    case 'rawg':
      throw new Error('RAWG.io provider is not yet implemented')
    
    case 'igdb':
      throw new Error('IGDB provider is not yet implemented')
    
    default:
      throw new Error(`Unsupported provider: ${config.provider}`)
  }
}

/**
 * Create a TheGamesDB client directly
 * 
 * @param config - TheGamesDB configuration
 * @returns TheGamesDB client instance
 * 
 * @example
 * ```typescript
 * const client = createTgdbClient({
 *   apiKey: 'your-api-key',
 *   baseUrl: 'https://api.thegamesdb.net' // optional
 * })
 * ```
 */
export function createTgdbClient(config: TgdbConfig): TgdbClient {
  return new TgdbClient(config)
}

// Re-export types from shared for convenience
export type { GamesApiClient, Provider, BaseConfig } from './shared/types'
export type {
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
} from './shared/types'

export { GamesApiError } from './shared/types'
export { TgdbClient } from './providers/tgdb'
export type { TgdbConfig } from './providers/tgdb' 