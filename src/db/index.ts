import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const env = dotenv.config();
dotenvExpand.expand(env);

const db = drizzle({
  logger: true,
  connection: process.env.DATABASE_URL,
  schema,
});

export default db;
