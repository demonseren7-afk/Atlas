import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("manifest provides the minimum installable PWA metadata", async () => {
  const manifest = JSON.parse(await readFile("public/manifest.json", "utf8"));

  assert.equal(manifest.name, "Atlas");
  assert.equal(manifest.short_name, "Atlas");
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.background_color, "#f8fafc");
  assert.equal(manifest.theme_color, "#111827");
  assert.ok(
    manifest.icons.some(
      (icon: { src: string; sizes: string }) =>
        icon.src === "/icons/icon-192.png" && icon.sizes === "192x192"
    )
  );
  assert.ok(
    manifest.icons.some(
      (icon: { src: string; sizes: string }) =>
        icon.src === "/icons/icon-512.png" && icon.sizes === "512x512"
    )
  );
});

test("service worker caches app shell requests and falls back to network", async () => {
  const serviceWorker = await readFile("public/sw.js", "utf8");

  assert.match(serviceWorker, /CACHE_NAME/);
  assert.match(serviceWorker, /self\.addEventListener\("install"/);
  assert.match(serviceWorker, /self\.addEventListener\("fetch"/);
  assert.match(serviceWorker, /caches\.match/);
  assert.match(serviceWorker, /fetch\(event\.request\)/);
});

test("root layout links manifest, mobile metadata, and service worker registration", async () => {
  const layout = await readFile("app/layout.tsx", "utf8");

  assert.match(layout, /manifest: "\/manifest\.json"/);
  assert.match(layout, /apple: "\/icons\/apple-touch-icon\.png"/);
  assert.match(layout, /RegisterServiceWorker/);
});

test("vercel config uses Next build output", async () => {
  const config = JSON.parse(await readFile("vercel.json", "utf8"));

  assert.equal(config.buildCommand, "npm run build");
  assert.equal(config.outputDirectory, ".next");
  assert.equal(config.framework, "nextjs");
});
