import ogs from "open-graph-scraper";
test("Open graph data", async () => {
  const data = await ogs({ url: "https://www.google.com" });
});
