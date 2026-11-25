import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

type PortraitRecord = {
  src: string;
  pageTitle?: string;
  sourceUrl?: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
};

const ROOT = process.cwd();
const MANIFEST = path.join(ROOT, "data", "portraits.json");
const USER_AGENT = "Philos-Friend/0.1 (local portrait credits; contact: local operator)";

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function getJson(params: Record<string, string>): Promise<any> {
  const url = new URL("https://en.wikipedia.org/w/api.php");
  url.search = new URLSearchParams({ ...params, format: "json", origin: "*" }).toString();
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Wikipedia ${response.status}`);
  return response.json();
}

async function main() {
  const manifest: Record<string, PortraitRecord> = JSON.parse(
    await readFile(MANIFEST, "utf8"),
  );

  const pending = Object.entries(manifest).filter(
    ([, portrait]) => portrait.pageTitle && !portrait.author && !portrait.license && !portrait.sourceUrl,
  );

  if (pending.length === 0) {
    console.log("Nothing to enrich.");
    return;
  }

  const titleToFile = new Map<string, string>();
  const redirects = new Map<string, string>();
  const normalized = new Map<string, string>();

  for (const batch of chunk([...new Set(pending.map(([, p]) => p.pageTitle!))], 50)) {
    const data = await getJson({
      action: "query",
      prop: "pageimages",
      piprop: "name",
      redirects: "1",
      titles: batch.join("|"),
    });
    for (const entry of data?.query?.normalized ?? []) {
      normalized.set(entry.from, entry.to);
    }
    for (const entry of data?.query?.redirects ?? []) {
      redirects.set(entry.from, entry.to);
    }
    for (const page of Object.values(data?.query?.pages ?? {}) as any[]) {
      if (page?.pageimage) titleToFile.set(page.title, page.pageimage);
    }
    await sleep(1200);
  }

  function resolveFile(title: string): string | undefined {
    let current = title;
    for (let step = 0; step < 4; step += 1) {
      const direct = titleToFile.get(current);
      if (direct) return direct;
      const next = redirects.get(current) ?? normalized.get(current);
      if (!next || next === current) break;
      current = next;
    }
    return undefined;
  }

  const fileToEntry = new Map<string, string>();
  const resolved = new Map<string, string>();
  for (const [id, portrait] of pending) {
    const file = resolveFile(portrait.pageTitle!);
    if (!file) continue;
    resolved.set(id, file);
    fileToEntry.set(file.replace(/_/g, " "), id);
  }

  const files = [...new Set(resolved.values())];
  console.log(`Resolved ${files.length} files for ${pending.length} portraits.`);

  for (const batch of chunk(files, 50)) {
    const data = await getJson({
      action: "query",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "512",
      titles: batch.map((file) => `File:${file}`).join("|"),
    });
    for (const page of Object.values(data?.query?.pages ?? {}) as any[]) {
      const file = String(page?.title ?? "").replace(/^File:/, "");
      const info = page?.imageinfo?.[0];
      if (!file || !info) continue;
      const id = fileToEntry.get(file);
      if (!id) continue;
      const meta = info.extmetadata ?? {};
      manifest[id] = {
        ...manifest[id],
        sourceUrl: info.descriptionurl,
        author: meta.Artist?.value ? stripHtml(meta.Artist.value) : undefined,
        license: meta.LicenseShortName?.value
          ? stripHtml(meta.LicenseShortName.value)
          : undefined,
        licenseUrl: meta.LicenseUrl?.value,
      };
    }
    await sleep(1200);
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  const enriched = Object.values(manifest).filter((portrait) => portrait.license).length;
  console.log(`Credits enriched: ${enriched}/${Object.keys(manifest).length} have a license.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
