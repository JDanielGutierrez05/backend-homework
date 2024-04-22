const path = require('path')
const { Seeder } = require('mongo-seeding')

async function seed() {
  const config = {
    database: 'mongodb://root:example@database',
    dropCollections: true,
  }

  const seeder = new Seeder(config)
  const collectionReadingOptions = {
    extensions: ['json'],
  }
  const collections = seeder.readCollectionsFromPath(
    path.resolve('./data/'),
    collectionReadingOptions
  )

  console.log('SEEDER: backend homework seeding started ...')
  try {
    await seeder.import(collections)
    console.log('SEEDER: backend homework seeding succeeded!')
  } catch (err) {
    console.log('SEEDER: An error occurred seeding backend homework => ', err)
  }
}

seed()
