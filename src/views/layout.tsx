import type { FC } from "hono/jsx";

export const Layout: FC = ({ children }) => {
  return (
    <html>
      <head>
        <title>Hono</title>
      </head>
      <body>{children}</body>
    </html>
  );
};
