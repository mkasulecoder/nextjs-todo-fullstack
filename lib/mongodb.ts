// lib/mongodb.ts
import { MongoClient, MongoClientOptions } from 'mongodb';

const uri: string = process.env.NEXT_PUBLIC_MONGO_DB_URL!;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.NEXT_PUBLIC_MONGO_DB_URL) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise as Promise<MongoClient>;

// Add this to make TypeScript happy
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}


// // lib/mongodb.js
// import { MongoClient } from 'mongodb';
//
// const uri = process.env.NEXT_PUBLIC_MONGO_DB_URL!;
// const options = {};
//
// let client;
// let clientPromise;
//
// if (!process.env.NEXT_PUBLIC_MONGO_DB_URL) {
//     throw new Error('Please add your Mongo URI to .env.local');
// }
//
// if (process.env.NODE_ENV === 'development') {
//     if (!global._mongoClientPromise) {
//         client = new MongoClient(uri, options);
//         global._mongoClientPromise = client.connect();
//     }
//     clientPromise = global._mongoClientPromise;
// } else {
//     client = new MongoClient(uri, options);
//     clientPromise = client.connect();
// }
//
// export default clientPromise;

