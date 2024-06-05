import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let connection;

try {
  // Connect the client to the server	(optional starting in v4.7)
  connection = await client.connect();
} catch(e) {
  console.error(e);
}

let db = connection.db("pelican");

export default db;
