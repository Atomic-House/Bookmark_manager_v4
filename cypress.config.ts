import { defineConfig } from "cypress";
require("dotenv").config();
export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    googleRefreshToken: process.env.NEXT_PUBLIC_GOOGLE_REFRESH_TOKEN,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
