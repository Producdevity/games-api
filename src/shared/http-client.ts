import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { GamesApiError, Provider } from './types'

/**
 * Configuration for the HTTP client
 */
export interface HttpClientConfig {
  baseURL: string
  timeout?: number
  defaultHeaders?: Record<string, string>
  provider: Provider
}

/**
 * HTTP client wrapper around axios with error handling
 */
export class HttpClient {
  private client: AxiosInstance
  private provider: Provider

  constructor(config: HttpClientConfig) {
    this.provider = config.provider

    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'games-api/0.0.1',
        ...config.defaultHeaders,
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          'Unknown error occurred'

        const statusCode = error.response?.status

        throw new GamesApiError(message, statusCode, this.provider, error)
      },
    )
  }

  /**
   * Make a GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  /**
   * Make a POST request
   */
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  /**
   * Make a PUT request
   */
  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  /**
   * Update default headers
   */
  setDefaultHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value
  }

  /**
   * Remove default header
   */
  removeDefaultHeader(key: string): void {
    delete this.client.defaults.headers.common[key]
  }
}
