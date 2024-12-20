import { raw } from "hono/html";
import type { FC } from "hono/jsx";

export const Book: FC = ({ title, author, id }) => {
  const script = raw(`
    document.getElementById("deleteBtn-${id}").addEventListener("click", async () => {
      await fetch("/books/${id}", { method: "DELETE" });
      window.location.href = "/books";
    });
  `);

  return (
    <div>
      <h1>{title}</h1>
      <p>{author}</p>
      <a href={`/books/${id}`}>Edit</a>
      <button id={`deleteBtn-${id}`}>Delete</button>
      <script>{script}</script>
    </div>
  );
};
