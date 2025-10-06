import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html data-theme="halloween">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tiki Hit List</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
