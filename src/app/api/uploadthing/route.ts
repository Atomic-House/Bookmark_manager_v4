//Route to access the Upload thing API and perform GET and POST request

import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
