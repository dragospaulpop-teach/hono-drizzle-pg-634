import { raw } from "hono/html";

export const CreateBookForm = ({}: {}) => {
  const script = raw(`
    const form = document.getElementById("createForm");
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      await fetch("/books", { method: "POST", body: JSON.stringify({ title: document.getElementById("title").value, author: document.getElementById("author").value }) });
      window.location.href = "/books";
    });
  `);
  return (
    <form id="createForm" action="/books" method="post">
      <input type="text" name="title" id="title" />
      <input type="text" name="author" id="author" />
      <button type="submit" id="createBtn">
        Create
      </button>
      <script>{script}</script>
    </form>
  );
};
