import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const cached = (globalThis as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> });

if (!cached._mongoClientPromise) {
  const client = new MongoClient(uri, options);
  cached._mongoClientPromise = client.connect();
}

const clientPromise = cached._mongoClientPromise!;

export default clientPromise;

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('saree_catalog');
}
