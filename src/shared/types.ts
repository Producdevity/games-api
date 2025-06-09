/**
 * Types based on TheGamesDB API specification
 * These serve as the baseline interface for all providers
 */

/**
 * Available gaming API providers
 */
export type Provider = 'tgdb' | 'rawg' | 'igdb'

/**
 * Base configuration for API clients
 */
export interface BaseConfig {
  apiKey: string
  baseUrl?: string
  timeout?: number
}

/**
 * Base API response structure (from TGDB)
 */
export interface BaseApiResponse {
  code: number
  status: string
  remaining_monthly_allowance: number
  extra_allowance: number
}

/**
 * Paginated API response structure (from TGDB)
 */
export interface PaginatedApiResponse extends BaseApiResponse {
  pages: {
    previous: string
    current: string
    next: string
  }
}

/**
 * Image base URL metadata (from TGDB)
 */
export interface ImageBaseUrlMeta {
  original: string
  small: string
  thumb: string
  cropped_center_thumb: string
  medium: string
  large: string
}

/**
 * Game data structure (based on TGDB Game)
 */
export interface Game {
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
  os?: string
  processor?: string
  ram?: string
  hdd?: string
  video?: string
  sound?: string
  developers?: number[]
  genres?: number[]
  publishers?: number[]
  alternates?: string[]
}

/**
 * Platform data structure (based on TGDB Platform)
 */
export interface Platform {
  id: number
  name: string
  alias: string
  icon?: string
  console?: string
  controller?: string
  developer?: string
  overview?: string
}

/**
 * Skinny platform data used in includes
 */
export interface PlatformSkinny {
  id: number
  name: string
  alias: string
}

/**
 * Genre data structure (based on TGDB Genre)
 */
export interface Genre {
  id: number
  name: string
}

/**
 * Developer data structure (based on TGDB Developer)
 */
export interface Developer {
  id: number
  name: string
}

/**
 * Publisher data structure (based on TGDB Publisher)
 */
export interface Publisher {
  id: number
  name: string
}

/**
 * Game image structure (based on TGDB GameImage)
 */
export interface GameImage {
  id: number
  type: 'boxart' | 'fanart' | 'banner' | 'screenshot' | 'clearlogo' | 'titlescreen'
  side?: 'front' | 'back'
  filename: string
  resolution?: string
}

/**
 * Platform image structure (based on TGDB PlatformImage)
 */
export interface PlatformImage {
  id: number
  type: 'fanart' | 'banner' | 'boxart'
  filename: string
}

/**
 * Update model (from TGDB)
 */
export interface UpdateModel {
  edit_id: number
  game_id: number
  timestamp: string
  type: string
  value: string
}

/**
 * Games by ID response
 */
export interface GamesByIdResponse extends PaginatedApiResponse {
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

/**
 * Games by name response (v1)
 */
export interface GamesByNameV1Response extends PaginatedApiResponse {
  data: {
    count: number
    games: Game[]
  }
  include: {
    boxart: {
      base_url: ImageBaseUrlMeta
      data: Record<string, GameImage[]>
    }
    platform: Record<string, PlatformSkinny>
  }
}

/**
 * Games images response
 */
export interface GamesImagesResponse extends PaginatedApiResponse {
  data: {
    count: number
    base_url: ImageBaseUrlMeta
    images: Record<string, GameImage[]>
  }
}

/**
 * Games updates response
 */
export interface GamesUpdatesResponse extends PaginatedApiResponse {
  data: {
    count: number
    updates: UpdateModel[]
  }
}

/**
 * Platforms response
 */
export interface PlatformsResponse extends BaseApiResponse {
  data: {
    count: number
    platforms: Record<string, Platform>
  }
}

/**
 * Platforms by ID response
 */
export interface PlatformsByIdResponse extends BaseApiResponse {
  data: {
    count: number
    platforms: Record<string, Platform>
  }
}

/**
 * Platforms by name response
 */
export interface PlatformsByNameResponse extends BaseApiResponse {
  data: {
    count: number
    platforms: Platform[]
  }
}

/**
 * Platform images response
 */
export interface PlatformImagesResponse extends PaginatedApiResponse {
  data: {
    count: number
    base_url: ImageBaseUrlMeta
    images: Record<string, PlatformImage[]>
  }
}

/**
 * Genres response
 */
export interface GenresResponse extends BaseApiResponse {
  data: {
    count: number
    genres: Record<string, Genre>
  }
}

/**
 * Developers response
 */
export interface DevelopersResponse extends BaseApiResponse {
  data: {
    count: number
    developers: Record<string, Developer>
  }
}

/**
 * Publishers response
 */
export interface PublishersResponse extends BaseApiResponse {
  data: {
    count: number
    publishers: Record<string, Publisher>
  }
}

/**
 * Available fields for game requests (from TGDB spec)
 */
export type GameFields = 
  | 'players' 
  | 'publishers' 
  | 'genres' 
  | 'overview' 
  | 'last_updated' 
  | 'rating' 
  | 'platform' 
  | 'coop' 
  | 'youtube' 
  | 'os' 
  | 'processor' 
  | 'ram' 
  | 'hdd' 
  | 'video' 
  | 'sound' 
  | 'alternates'

/**
 * Available includes for game requests (from TGDB spec)
 */
export type GameIncludes = 'boxart' | 'platform'

/**
 * Available fields for platform requests (from TGDB spec)
 */
export type PlatformFields = 
  | 'icon' 
  | 'console' 
  | 'controller' 
  | 'developer' 
  | 'manufacturer' 
  | 'media' 
  | 'cpu' 
  | 'memory' 
  | 'graphics' 
  | 'sound' 
  | 'maxcontrollers' 
  | 'display' 
  | 'overview' 
  | 'youtube'

/**
 * Available image types for filtering (from TGDB spec)
 */
export type GameImageTypes = 'fanart' | 'banner' | 'boxart' | 'screenshot' | 'clearlogo' | 'titlescreen'
export type PlatformImageTypes = 'fanart' | 'banner' | 'boxart'

/**
 * Games API client interface based on TheGamesDB API
 * All providers must implement this interface using TGDB's structure
 */
export interface GamesApiClient {
  // Games endpoints
  gamesByGameId(params: {
    id: string
    fields?: string
    include?: string
    page?: number
  }): Promise<GamesByIdResponse>

  gamesByGameName(params: {
    name: string
    fields?: string
    'filter[platform]'?: string
    include?: string
    page?: number
  }): Promise<GamesByIdResponse>

  gamesByPlatformId(params: {
    id: string
    fields?: string
    include?: string
    page?: number
  }): Promise<GamesByIdResponse>

  gamesImages(params: {
    games_id: string
    'filter[type]'?: string
    page?: number
  }): Promise<GamesImagesResponse>

  gamesUpdates(params: {
    last_edit_id: number
    time?: number
    page?: number
  }): Promise<GamesUpdatesResponse>

  // Platforms endpoints
  platforms(params?: {
    fields?: string
  }): Promise<PlatformsResponse>

  platformsByPlatformId(params: {
    id: number
    fields?: string
  }): Promise<PlatformsByIdResponse>

  platformsByPlatformName(params: {
    name: string
    fields?: string
  }): Promise<PlatformsByNameResponse>

  platformsImages(params: {
    platforms_id: string
    'filter[type]'?: string
    page?: number
  }): Promise<PlatformImagesResponse>

  // Other endpoints
  genres(): Promise<GenresResponse>
  developers(): Promise<DevelopersResponse>
  publishers(): Promise<PublishersResponse>
}

/**
 * Error class for Games API
 */
export class GamesApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public provider?: Provider,
    public originalError?: any
  ) {
    super(message)
    this.name = 'GamesApiError'
  }
} 