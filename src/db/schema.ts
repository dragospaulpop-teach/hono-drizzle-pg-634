import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const booksTable = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  author: text("author").notNull(),
});
