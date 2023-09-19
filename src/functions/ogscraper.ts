import ogs from "open-graph-scraper";
import { OpenGraphScraperOptions } from "open-graph-scraper/dist/lib/types";

export async function getMetaData(url: string) {
  const nUrl = new URL(url);
  const userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";
  const options: OpenGraphScraperOptions = {
    url: url,
    fetchOptions: {
      headers: {
        "user-agent": userAgent,
      },
    },
  };
  const data = await ogs(options);

  if (data.error) {
    return { error: true };
  }
  const favicon = checkFavicon(nUrl, data.result.favicon);

  return {
    title: data.result.ogTitle?.replace(/[^\x20-\x7E]/gim, "").trim(),
    desciption: data.result.ogDescription,
    favicon: favicon,
    preview: data.result.ogImage?.at(0)?.url,
  };
}
function checkFavicon(url: URL, favicon?: string): string {
  if (!favicon) {
    return `https://icon.horse/icon/${url.hostname}`;
  }
  if (favicon.includes("http")) {
    return favicon;
  } else {
    return url.origin.concat(favicon);
  }
}
//Add functionality for checking errors
function checkError(
  url: URL,
  data: Awaited<ReturnType<typeof ogs>>,
  favicon: string,
): Awaited<ReturnType<typeof getMetaData>> {
  return {
    title: data.result.ogTitle?.replace(/[^\x20-\x7E]/gim, "").trim(),
    desciption: data.result.ogDescription,
    favicon: favicon,
    preview: data.result.ogImage?.at(0)?.url,
  };
}
