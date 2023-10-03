import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  // e2e: {
  //   // experimentalModifyObstructiveThirdPartyCode: true,
  //   baseUrl: "http://localhost:3000",
});
