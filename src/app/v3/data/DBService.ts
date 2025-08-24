import * as mongoDB from 'mongodb';
import type MongoCat from './MongoCat.js';

export const collections: { cats?: mongoDB.Collection<MongoCat> } = {};

export async function connectToDatabase() {
  const { DB_CONN_STRING, DB_NAME, CATS_COLLECTION_NAME } = process.env;
  if (!DB_CONN_STRING || !DB_NAME || !CATS_COLLECTION_NAME) {
    throw new Error('Missing environment variables');
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);

  await client.connect();
  const db: mongoDB.Db = client.db(DB_NAME);

  const catsCollection: mongoDB.Collection<MongoCat> =
    db.collection(CATS_COLLECTION_NAME);
  collections.cats = catsCollection;
}
