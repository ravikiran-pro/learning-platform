import { MongoClient, Db } from "mongodb";

export class Mongo {
  public static uri = process.env.MONGO_URL;
  private client: MongoClient;
  private db?: Db;

  constructor() {
    if (!Mongo.uri) throw new Error("MONGO_URL not set");
    this.client = new MongoClient(Mongo.uri);
  }

  async connect(dbName: string = "learning_platform_docs") {
    if (this.db) return this.db;
    await this.client.connect();
    this.db = this.client.db(dbName);
    return this.db;
  }

  async disconnect() {
    if (!this.client) return;
    await this.client.close();
    this.db = undefined;
  }
}

export const MongoConnection = new Mongo();