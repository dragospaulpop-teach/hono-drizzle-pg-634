import { eq } from "drizzle-orm";
import { Context, Hono } from "hono";
import { logger } from "hono/logger";
import db from "./db";
import { booksTable } from "./db/schema";
import { Book } from "./views/book";
import { Books } from "./views/books";
import { CreateBookForm } from "./views/create-book-form";
import { EditBookForm } from "./views/edit-book-form";
import { Layout } from "./views/layout";

const app = new Hono();
app.use(logger());

app.get("/", async (c) => {
  return c.html(
    <Layout>
      <Books>
        <Book title="The Great Gatsby" author="F. Scott Fitzgerald" />
      </Books>
    </Layout>
  );
});

app.get("/books", async (c) => {
  const books = await db.select().from(booksTable);
  return c.html(
    <Layout>
      <Books>
        {books.map((book) => (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
          />
        ))}
      </Books>
      <CreateBookForm />
    </Layout>
  );
});

app.get("/books/:id", async (c) => {
  const { id } = c.req.param();
  const [book] = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, id));
  return c.html(
    <Layout>
      <EditBookForm title={book.title} author={book.author} id={book.id} />
    </Layout>
  );
});

app.post("/books", async (c) => {
  const book = await c.req.json();
  const newBook = await db.insert(booksTable).values(book).returning();
  return c.json(newBook);
});

const saveBook = async (c: Context) => {
  const { id } = c.req.param();
  const headers = c.req.header();
  const book = {
    id: id,
    title: "",
    author: "",
  };

  if (headers["content-type"] === "application/json") {
    const json = await c.req.json();
    book.title = json.title;
    book.author = json.author;
  } else if (headers["content-type"] === "application/x-www-form-urlencoded") {
    const formData = await c.req.formData();
    book.title = formData.get("title") as string;
    book.author = formData.get("author") as string;
  } else {
    return c.json({ error: "Invalid request" }, 400);
  }

  const updatedBook = await db
    .update(booksTable)
    .set(book)
    .where(eq(booksTable.id, id))
    .returning();
  if (headers["content-type"] === "application/json") {
    return c.json(updatedBook);
  } else {
    return c.redirect("/books");
  }
};

app.put("/books/:id", saveBook);
app.post("/books/:id", saveBook);

app.delete("/books/:id", async (c) => {
  const { id } = c.req.param();
  const deletedBook = await db.delete(booksTable).where(eq(booksTable.id, id));
  return c.json(deletedBook);
});

export default app;
