export default function getCroppedImageURL(url: string) {
  if (!url) return undefined;

  const marker = "media/";
  const index = url.indexOf(marker);

  if (index === -1) return url;

  const before = url.slice(0, index + marker.length); // includes "media/"
  const after = url.slice(index + marker.length); // rest of the url

  return `${before}crop/600/400/${after}`;
}
