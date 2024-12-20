import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
import { defineConfig } from "drizzle-kit";

const env = dotenv.config();
dotenvExpand.expand(env);

console.log(process.env.DATABASE_URL);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
