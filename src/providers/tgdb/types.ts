/**
 * TheGamesDB API specific configuration and types
 */

import { BaseConfig } from '../../shared/types'

/**
 * TheGamesDB API configuration
 */
export interface TgdbConfig extends BaseConfig {
  baseUrl?: string
}

/**
 * Base API response structure from TheGamesDB
 */
export interface TgdbBaseApiResponse {
  code: number
  status: string
  remaining_monthly_allowance: number
  extra_allowance: number
}

/**
 * Paginated API response structure
 */
export interface TgdbPaginatedApiResponse extends TgdbBaseApiResponse {
  pages: {
    previous: string
    current: string
    next: string
  }
}

/**
 * Image base URL metadata
 */
export interface TgdbImageBaseUrlMeta {
  original: string
  small: string
  thumb: string
  cropped_center_thumb: string
  medium: string
  large: string
}

/**
 * Raw game data from TheGamesDB
 */
export interface TgdbGame {
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
 * Raw platform data from TheGamesDB
 */
export interface TgdbPlatform {
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
export interface TgdbPlatformSkinny {
  id: number
  name: string
  alias: string
}

/**
 * Raw genre data from TheGamesDB
 */
export interface TgdbGenre {
  id: number
  name: string
}

/**
 * Raw developer data from TheGamesDB
 */
export interface TgdbDeveloper {
  id: number
  name: string
}

/**
 * Raw publisher data from TheGamesDB
 */
export interface TgdbPublisher {
  id: number
  name: string
}

/**
 * Game image data from TheGamesDB
 */
export interface TgdbGameImage {
  id: number
  type:
    | 'boxart'
    | 'fanart'
    | 'banner'
    | 'screenshot'
    | 'clearlogo'
    | 'titlescreen'
  side?: 'front' | 'back'
  filename: string
  resolution?: string
}

/**
 * Platform image data from TheGamesDB
 */
export interface TgdbPlatformImage {
  id: number
  type: 'fanart' | 'banner' | 'boxart'
  filename: string
}

/**
 * Update model from TheGamesDB
 */
export interface TgdbUpdateModel {
  edit_id: number
  game_id: number
  timestamp: string
  type: string
  value: string
}

/**
 * Games by ID response
 */
export interface TgdbGamesByIdResponse extends TgdbPaginatedApiResponse {
  data: {
    count: number
    games: TgdbGame[]
  }
  include: {
    boxart: {
      base_url: TgdbImageBaseUrlMeta
      data: Record<string, TgdbGameImage[]>
    }
    platform: {
      data: Record<string, TgdbPlatformSkinny>
    }
  }
}

/**
 * Games by name response (v1)
 */
export interface TgdbGamesByNameV1Response extends TgdbPaginatedApiResponse {
  data: {
    count: number
    games: TgdbGame[]
  }
  include: {
    boxart: {
      base_url: TgdbImageBaseUrlMeta
      data: Record<string, TgdbGameImage[]>
    }
    platform: Record<string, TgdbPlatformSkinny>
  }
}

/**
 * Games images response
 */
export interface TgdbGamesImagesResponse extends TgdbPaginatedApiResponse {
  data: {
    count: number
    base_url: TgdbImageBaseUrlMeta
    images: Record<string, TgdbGameImage[]>
  }
}

/**
 * Games updates response
 */
export interface TgdbGamesUpdatesResponse extends TgdbPaginatedApiResponse {
  data: {
    count: number
    updates: TgdbUpdateModel[]
  }
}

/**
 * Platforms response
 */
export interface TgdbPlatformsResponse extends TgdbBaseApiResponse {
  data: {
    count: number
    platforms: Record<string, TgdbPlatform>
  }
}

/**
 * Platforms by ID response
 */
export interface TgdbPlatformsByIdResponse extends TgdbBaseApiResponse {
  data: {
    count: number
    platforms: Record<string, TgdbPlatform>
  }
}

/**
 * Platforms by name response
 */
export interface TgdbPlatformsByNameResponse extends TgdbBaseApiResponse {
  data: {
    count: number
    platforms: TgdbPlatform[]
  }
}

/**
 * Platform images response
 */
export interface TgdbPlatformImagesResponse extends TgdbPaginatedApiResponse {
  data: {
    count: number
    base_url: TgdbImageBaseUrlMeta
    images: Record<string, TgdbPlatformImage[]>
  }
}

/**
 * Genres response
 */
export interface TgdbGenresResponse extends TgdbBaseApiResponse {
  data: {
    count: number
    genres: Record<string, TgdbGenre>
  }
}

/**
 * Developers response
 */
export interface TgdbDevelopersResponse extends TgdbBaseApiResponse {
  data: {
    count: number
    developers: Record<string, TgdbDeveloper>
  }
}

/**
 * Publishers response
 */
export interface TgdbPublishersResponse extends TgdbBaseApiResponse {
  data: {
    count: number
    publishers: Record<string, TgdbPublisher>
  }
}

/**
 * Available fields for game requests
 */
export type TgdbGameFields =
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
 * Available includes for game requests
 */
export type TgdbGameIncludes = 'boxart' | 'platform'

/**
 * Available fields for platform requests
 */
export type TgdbPlatformFields =
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
 * Available image types for filtering
 */
export type TgdbGameImageTypes =
  | 'fanart'
  | 'banner'
  | 'boxart'
  | 'screenshot'
  | 'clearlogo'
  | 'titlescreen'
export type TgdbPlatformImageTypes = 'fanart' | 'banner' | 'boxart'
