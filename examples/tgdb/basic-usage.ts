/**
 * Basic usage example for TheGamesDB API
 *
 * This example demonstrates how to use the TGDB client with the
 * native TheGamesDB interface and response structures.
 */

import { createTgdbClient, createGamesApiClient } from '../../src/main'

async function main() {
  // Replace with your actual API key from https://thegamesdb.net/
  const API_KEY = 'your-api-key-here'

  // Create client using the factory (recommended)
  const client = createGamesApiClient({
    provider: 'tgdb',
    apiKey: API_KEY,
  })

  // Or create TGDB client directly
  // const client = createTgdbClient({ apiKey: API_KEY })

  try {
    // Search for games by name
    console.log('Searching for Mario games...')
    const searchResponse = await client.gamesByGameName({
      name: 'Super Mario',
      fields: 'overview,rating,players',
      include: 'boxart,platform',
    })

    console.log(`Found ${searchResponse.data.count} games`)
    searchResponse.data.games.slice(0, 3).forEach((game) => {
      console.log(`- ${game.game_title} (${game.release_date})`)
      if (game.overview) {
        console.log(`  Overview: ${game.overview.substring(0, 100)}...`)
      }
    })

    // Get specific games by ID
    console.log('\nGetting specific games by ID...')
    const gameResponse = await client.gamesByGameId({
      id: '1,2,3',
      fields: 'overview,rating,developers,publishers,genres',
      include: 'boxart,platform',
    })

    gameResponse.data.games.forEach((game) => {
      console.log(`\nGame: ${game.game_title}`)
      console.log(`Release Date: ${game.release_date}`)
      console.log(`Rating: ${game.rating}`)
      console.log(`Developers: ${game.developers?.length || 0}`)
      console.log(`Genres: ${game.genres?.length || 0}`)
    })

    // Get games by platform
    console.log('\nGetting games for Nintendo 64 (platform ID 3)...')
    const platformGamesResponse = await client.gamesByPlatformId({
      id: '3',
      fields: 'overview,rating',
      page: 1,
    })

    console.log(`Found ${platformGamesResponse.data.count} N64 games`)
    platformGamesResponse.data.games.slice(0, 5).forEach((game) => {
      console.log(`- ${game.game_title}`)
    })

    // Get game images
    console.log('\nGetting images for a specific game...')
    const imagesResponse = await client.gamesImages({
      games_id: '1',
      'filter[type]': 'boxart,screenshot',
    })

    console.log(`Found ${imagesResponse.data.count} images`)
    Object.entries(imagesResponse.data.images).forEach(([gameId, images]) => {
      console.log(`Game ${gameId} has ${images.length} images`)
      images.forEach((image) => {
        const fullUrl = `${imagesResponse.data.base_url.original}${image.filename}`
        console.log(`- ${image.type}: ${fullUrl}`)
      })
    })

    // Get all platforms
    console.log('\nGetting all platforms...')
    const platformsResponse = await client.platforms({
      fields: 'icon,console,developer',
    })

    console.log(`Found ${platformsResponse.data.count} platforms`)
    Object.values(platformsResponse.data.platforms)
      .slice(0, 5)
      .forEach((platform) => {
        console.log(
          `- ${platform.name} (${platform.alias}) by ${platform.developer}`,
        )
      })

    // Get platform by ID
    console.log('\nGetting Nintendo 64 platform details...')
    const platformResponse = await client.platformsByPlatformId({
      id: 3,
      fields: 'overview,developer',
    })

    const n64 = Object.values(platformResponse.data.platforms)[0]
    if (n64) {
      console.log(`Platform: ${n64.name}`)
      console.log(`Developer: ${n64.developer}`)
      if (n64.overview) {
        console.log(`Overview: ${n64.overview.substring(0, 200)}...`)
      }
    }

    // Search platforms by name
    console.log('\nSearching for Nintendo platforms...')
    const nintendoPlatformsResponse = await client.platformsByPlatformName({
      name: 'Nintendo',
    })

    console.log(
      `Found ${nintendoPlatformsResponse.data.count} Nintendo platforms`,
    )
    nintendoPlatformsResponse.data.platforms.forEach((platform) => {
      console.log(`- ${platform.name} (${platform.alias})`)
    })

    // Get genres
    console.log('\nGetting all genres...')
    const genresResponse = await client.genres()

    console.log(`Found ${genresResponse.data.count} genres`)
    Object.values(genresResponse.data.genres)
      .slice(0, 10)
      .forEach((genre) => {
        console.log(`- ${genre.name}`)
      })

    // Get developers
    console.log('\nGetting developers...')
    const developersResponse = await client.developers()

    console.log(`Found ${developersResponse.data.count} developers`)
    Object.values(developersResponse.data.developers)
      .slice(0, 10)
      .forEach((developer) => {
        console.log(`- ${developer.name}`)
      })

    // Get publishers
    console.log('\nGetting publishers...')
    const publishersResponse = await client.publishers()

    console.log(`Found ${publishersResponse.data.count} publishers`)
    Object.values(publishersResponse.data.publishers)
      .slice(0, 10)
      .forEach((publisher) => {
        console.log(`- ${publisher.name}`)
      })
  } catch (error) {
    console.error('Error:', error)
  }
}

// Run the example
main().catch(console.error)
