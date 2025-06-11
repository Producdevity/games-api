import 'dotenv/config'
import { createGamesApiClient } from '../../src/main'
import fs from 'fs'

const API_KEY = process.env.THE_GAMES_DB_API_KEY as string

const client = createGamesApiClient({
  provider: 'tgdb',
  apiKey: API_KEY,
})

client.gamesByPlatformId({ id: '1' }).then((games) => {
  console.dir(games.data, { depth: null })
})

client.platformsImages({ platforms_id: '1,2,3' }).then((platformsImages) => {
  const outputFile = 'platforms_images.json'
  fs.writeFileSync(outputFile, JSON.stringify(platformsImages.data, null, 2))
  // console.dir(platformsImages.data, { depth: null })
  // console.log(`Found ${platformsImages.data?.count} platforms images`)
})

client
  .platforms()
  .then((platforms) => {
    const outputFile = 'platforms.json'
    fs.writeFileSync(outputFile, JSON.stringify(platforms.data, null, 2))
    // console.dir(platforms.data.platforms, { depth: null })
    // console.log(`Found ${platforms.data?.count} platforms`)
  })
  .catch((error) => {
    console.error('Error fetching platforms:', error)
  })
