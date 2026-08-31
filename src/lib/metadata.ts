export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const siteUrl = "https://someoneisworking.github.io";
const defaultImage = "/og.png";

function setMeta(selector: string, value: string): void {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = value;
}

export function applyPageMetadata(metadata: PageMetadata): void {
  const image = new URL(metadata.image ?? defaultImage, siteUrl).toString();
  const url = new URL(metadata.path, siteUrl).toString();

  document.title = metadata.title;
  setMeta('meta[name="description"]', metadata.description);
  setMeta('meta[property="og:title"]', metadata.title);
  setMeta('meta[property="og:description"]', metadata.description);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[property="og:image"]', image);
  setMeta('meta[name="twitter:title"]', metadata.title);
  setMeta('meta[name="twitter:description"]', metadata.description);
  setMeta('meta[name="twitter:image"]', image);
}
