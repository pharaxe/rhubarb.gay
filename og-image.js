import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile } from "node:fs/promises";

// Photo: Dire Walf's 2025-12-04_MFF_direwalf_012, cropped from the top.

const SOURCE = "./src/img/og/card.jpg";
const OUTPUT_DIR = "./public/img/og/";
const URL_PATH = "/img/og/";

// The file name is a hash of the image, so swapping the photo gets a new URL
// instead of being hidden behind Bluesky's and Cloudflare's caches.
let published;

export function ogImage() {
  published ??= (async () => {
    const hash = createHash("sha256").update(await readFile(SOURCE)).digest("hex").slice(0, 12);
    await mkdir(OUTPUT_DIR, { recursive: true });
    await copyFile(SOURCE, `${OUTPUT_DIR}${hash}.jpg`);
    return `${URL_PATH}${hash}.jpg`;
  })();
  return published;
}
