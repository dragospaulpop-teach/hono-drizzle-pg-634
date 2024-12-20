import type { FC } from "hono/jsx";

export const Books: FC = ({ children }) => {
  return (
    <div>
      <h1>Books</h1>
      {children}
    </div>
  );
};
