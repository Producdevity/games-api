/**
 * TheGamesDB API Client Implementation
 * Implements the TGDB-based GamesApiClient interface
 */

import { HttpClient } from '../../shared/http-client'
import {
  GamesApiClient,
  GamesByIdResponse,
  GamesImagesResponse,
  GamesUpdatesResponse,
  PlatformsResponse,
  PlatformsByIdResponse,
  PlatformsByNameResponse,
  PlatformImagesResponse,
  GenresResponse,
  DevelopersResponse,
  PublishersResponse,
} from '../../shared/types'
import { TgdbConfig } from './types'

/**
 * TheGamesDB API Client
 * 
 * Provides direct access to TheGamesDB API with native TGDB responses.
 * Requires an API key which can be obtained at https://thegamesdb.net/
 * 
 * @example
 * ```typescript
 * const client = new TgdbClient({ apiKey: 'your-api-key' })
 * const response = await client.gamesByGameName({ name: 'Mario' })
 * ```
 */
export class TgdbClient implements GamesApiClient {
  private http: HttpClient
  private apiKey: string

  /**
   * Create a new TheGamesDB client
   * 
   * @param config - Configuration including API key
   */
  constructor(config: TgdbConfig) {
    this.apiKey = config.apiKey
    
    this.http = new HttpClient({
      baseURL: config.baseUrl || 'https://api.thegamesdb.net',
      timeout: config.timeout || 10000,
      provider: 'tgdb',
    })
  }

  /**
   * Fetch game(s) by id
   * 
   * @param params - Parameters for the API call
   * @returns Promise resolving to games response
   * 
   * @example
   * ```typescript
   * // Get single game
   * const response = await client.gamesByGameId({ id: '1' })
   * 
   * // Get multiple games with additional fields
   * const response = await client.gamesByGameId({ 
   *   id: '1,2,3', 
   *   fields: 'overview,rating',
   *   include: 'boxart,platform'
   * })
   * ```
   */
  async gamesByGameId(params: {
    id: string
    fields?: string
    include?: string
    page?: number
  }): Promise<GamesByIdResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      id: params.id,
    })

    if (params.fields) {
      searchParams.append('fields', params.fields)
    }

    if (params.include) {
      searchParams.append('include', params.include)
    }

    if (params.page) {
      searchParams.append('page', params.page.toString())
    }

    return this.http.get<GamesByIdResponse>(
      `/v1/Games/ByGameID?${searchParams.toString()}`
    )
  }

  /**
   * Fetch game(s) by name
   * 
   * @param params - Parameters for the API call
   * @returns Promise resolving to games response
   * 
   * @example
   * ```typescript
   * // Basic search
   * const response = await client.gamesByGameName({ name: 'Mario' })
   * 
   * // Search with platform filter
   * const response = await client.gamesByGameName({ 
   *   name: 'Zelda',
   *   'filter[platform]': '7', // Nintendo 64
   *   fields: 'overview,rating'
   * })
   * ```
   */
  async gamesByGameName(params: {
    name: string
    fields?: string
    'filter[platform]'?: string
    include?: string
    page?: number
  }): Promise<GamesByIdResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      name: params.name,
    })

    if (params.fields) {
      searchParams.append('fields', params.fields)
    }

    if (params['filter[platform]']) {
      searchParams.append('filter[platform]', params['filter[platform]'])
    }

    if (params.include) {
      searchParams.append('include', params.include)
    }

    if (params.page) {
      searchParams.append('page', params.page.toString())
    }

    return this.http.get<GamesByIdResponse>(
      `/v1.1/Games/ByGameName?${searchParams.toString()}`
    )
  }

  /**
   * Fetch game(s) by platform id
   * 
   * @param params - Parameters for the API call
   * @returns Promise resolving to games response
   * 
   * @example
   * ```typescript
   * const response = await client.gamesByPlatformId({ 
   *   id: '7', 
   *   fields: 'overview,rating',
   *   page: 1
   * })
   * ```
   */
  async gamesByPlatformId(params: {
    id: string
    fields?: string
    include?: string
    page?: number
  }): Promise<GamesByIdResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      id: params.id,
    })

    if (params.fields) {
      searchParams.append('fields', params.fields)
    }

    if (params.include) {
      searchParams.append('include', params.include)
    }

    if (params.page) {
      searchParams.append('page', params.page.toString())
    }

    return this.http.get<GamesByIdResponse>(
      `/v1/Games/ByPlatformID?${searchParams.toString()}`
    )
  }

  /**
   * Fetch game(s) images by game(s) id
   * 
   * @param params - Parameters for the API call
   * @returns Promise resolving to images response
   * 
   * @example
   * ```typescript
   * // Get all images for a game
   * const response = await client.gamesImages({ games_id: '1' })
   * 
   * // Get specific image types for multiple games
   * const response = await client.gamesImages({ 
   *   games_id: '1,2', 
   *   'filter[type]': 'boxart,screenshot'
   * })
   * ```
   */
  async gamesImages(params: {
    games_id: string
    'filter[type]'?: string
    page?: number
  }): Promise<GamesImagesResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      games_id: params.games_id,
    })

    if (params['filter[type]']) {
      searchParams.append('filter[type]', params['filter[type]'])
    }

    if (params.page) {
      searchParams.append('page', params.page.toString())
    }

    return this.http.get<GamesImagesResponse>(
      `/v1/Games/Images?${searchParams.toString()}`
    )
  }

  /**
   * Fetch games update
   * 
   * @param params - Parameters for the API call
   * @returns Promise resolving to updates response
   * 
   * @example
   * ```typescript
   * const response = await client.gamesUpdates({ last_edit_id: 12345 })
   * ```
   */
  async gamesUpdates(params: {
    last_edit_id: number
    time?: number
    page?: number
  }): Promise<GamesUpdatesResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      last_edit_id: params.last_edit_id.toString(),
    })

    if (params.time) {
      searchParams.append('time', params.time.toString())
    }

    if (params.page) {
      searchParams.append('page', params.page.toString())
    }

    return this.http.get<GamesUpdatesResponse>(
      `/v1/Games/Updates?${searchParams.toString()}`
    )
  }

  /**
   * Fetch platforms list
   * 
   * @param params - Optional parameters for the API call
   * @returns Promise resolving to platforms response
   * 
   * @example
   * ```typescript
   * const response = await client.platforms()
   * 
   * // With additional fields
   * const response = await client.platforms({ 
   *   fields: 'icon,console,developer'
   * })
   * ```
   */
  async platforms(params?: {
    fields?: string
  }): Promise<PlatformsResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
    })

    if (params?.fields) {
      searchParams.append('fields', params.fields)
    }

    return this.http.get<PlatformsResponse>(
      `/v1/Platforms?${searchParams.toString()}`
    )
  }

  /**
   * Fetch platforms list by id
   * 
   * @param params - Parameters for the API call
   * @returns Promise resolving to platforms response
   * 
   * @example
   * ```typescript
   * // Get single platform
   * const response = await client.platformsByPlatformId({ id: 7 })
   * 
   * // Get multiple platforms with fields
   * const response = await client.platformsByPlatformId({ 
   *   id: 7, 
   *   fields: 'overview,developer'
   * })
   * ```
   */
  async platformsByPlatformId(params: {
    id: number
    fields?: string
  }): Promise<PlatformsByIdResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      id: params.id.toString(),
    })

    if (params.fields) {
      searchParams.append('fields', params.fields)
    }

    return this.http.get<PlatformsByIdResponse>(
      `/v1/Platforms/ByPlatformID?${searchParams.toString()}`
    )
  }

  /**
   * Fetch platforms by name
   * 
   * @param params - Parameters for the API call
   * @returns Promise resolving to platforms response
   * 
   * @example
   * ```typescript
   * const response = await client.platformsByPlatformName({ 
   *   name: 'Nintendo',
   *   fields: 'overview,developer'
   * })
   * ```
   */
  async platformsByPlatformName(params: {
    name: string
    fields?: string
  }): Promise<PlatformsByNameResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      name: params.name,
    })

    if (params.fields) {
      searchParams.append('fields', params.fields)
    }

    return this.http.get<PlatformsByNameResponse>(
      `/v1/Platforms/ByPlatformName?${searchParams.toString()}`
    )
  }

  /**
   * Fetch platform(s) images by platform(s) id
   * 
   * @param params - Parameters for the API call
   * @returns Promise resolving to platform images response
   * 
   * @example
   * ```typescript
   * const response = await client.platformsImages({ 
   *   platforms_id: '7',
   *   'filter[type]': 'boxart,fanart'
   * })
   * ```
   */
  async platformsImages(params: {
    platforms_id: string
    'filter[type]'?: string
    page?: number
  }): Promise<PlatformImagesResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
      platforms_id: params.platforms_id,
    })

    if (params['filter[type]']) {
      searchParams.append('filter[type]', params['filter[type]'])
    }

    if (params.page) {
      searchParams.append('page', params.page.toString())
    }

    return this.http.get<PlatformImagesResponse>(
      `/v1/Platforms/Images?${searchParams.toString()}`
    )
  }

  /**
   * Fetch Genres list
   * 
   * @returns Promise resolving to genres response
   * 
   * @example
   * ```typescript
   * const response = await client.genres()
   * ```
   */
  async genres(): Promise<GenresResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
    })

    return this.http.get<GenresResponse>(
      `/v1/Genres?${searchParams.toString()}`
    )
  }

  /**
   * Fetch Developers list
   * 
   * @returns Promise resolving to developers response
   * 
   * @example
   * ```typescript
   * const response = await client.developers()
   * ```
   */
  async developers(): Promise<DevelopersResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
    })

    return this.http.get<DevelopersResponse>(
      `/v1/Developers?${searchParams.toString()}`
    )
  }

  /**
   * Fetch Publishers list
   * 
   * @returns Promise resolving to publishers response
   * 
   * @example
   * ```typescript
   * const response = await client.publishers()
   * ```
   */
  async publishers(): Promise<PublishersResponse> {
    const searchParams = new URLSearchParams({
      apikey: this.apiKey,
    })

    return this.http.get<PublishersResponse>(
      `/v1/Publishers?${searchParams.toString()}`
    )
  }
} 