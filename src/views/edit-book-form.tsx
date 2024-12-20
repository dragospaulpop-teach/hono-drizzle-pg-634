export const EditBookForm = ({
  title,
  author,
  id,
}: {
  title: string;
  author: string;
  id: string;
}) => {
  return (
    <form action={`/books/${id}`} method="post">
      <input type="text" name="title" value={title} />
      <input type="text" name="author" value={author} />
      <button type="submit">Edit</button>
    </form>
  );
};
