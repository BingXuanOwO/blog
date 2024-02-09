import { StartServer } from "@solidjs/start/server";
import { createHandler } from "@solidjs/start/entry";
import { ErrorBoundary } from "solid-js";
import { InternalServerError } from "./errorPages/500";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <title>冰轩's blog</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#292929" />
          {assets}
        </head>
        <body class="bg-background text-neutral-200 flex-col">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
