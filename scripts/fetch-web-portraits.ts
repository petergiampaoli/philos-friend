import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import sharp from "sharp";

type PortraitRecord = {
  src: string;
  pageTitle?: string;
  sourceUrl?: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
  note?: string;
};

type WebPortrait = {
  pageTitle: string;
  url: string;
  sourceUrl: string;
  author?: string;
  license: string;
  licenseUrl?: string;
  note?: string;
  crop?: "centre" | "north" | "attention";
  extract?: { left: number; top: number; width: number; height: number };
};

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "portraits");
const MANIFEST = path.join(ROOT, "data", "portraits.json");
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const WEB_PORTRAITS: Record<string, WebPortrait> = {
  austin: {
    pageTitle: "J. L. Austin",
    url: "https://cdn.britannica.com/88/268988-050-8BB01C7A/john-langshaw-austin-british-philosopher.jpg",
    sourceUrl: "https://www.britannica.com/biography/J-L-Austin",
    license: "Unknown (web image)",
  },
  ryle: {
    pageTitle: "Gilbert Ryle",
    url: "https://gtmarket.ru/files/personnels/gilbert-ryle.png",
    sourceUrl: "https://gtmarket.ru/library/basis/3298",
    license: "Unknown (web image)",
  },
  davidson: {
    pageTitle: "Donald Davidson",
    url: "https://gtmarket.ru/files/personnels/donald-davidson.jpg",
    sourceUrl: "https://gtmarket.ru/library/articles/1696",
    license: "Unknown (web image)",
  },
  anscombe: {
    pageTitle: "G. E. M. Anscombe",
    url: "https://static01.nyt.com/images/2011/01/08/us/BELIEFS/BELIEFS-jumbo.jpg?quality=75&auto=webp&disable=upscale",
    sourceUrl: "https://www.nytimes.com/2011/01/08/us/08beliefs.html",
    license: "Unknown (web image)",
  },
  foot: {
    pageTitle: "Philippa Foot",
    url: "https://upload.wikimedia.org/wikipedia/uk/9/96/Philippa_Foot.jpg",
    sourceUrl: "https://uk.wikipedia.org/wiki/Файл:Philippa_Foot.jpg",
    license: "Unknown (Wikipedia file)",
  },
  kittay: {
    pageTitle: "Eva Feder Kittay",
    url: "https://cdn.ymaws.com/www.apaonline.org/resource/resmgr/images/Kittay,_Eva.jpg",
    sourceUrl: "https://www.apaonline.org/general/custom.asp?page=lebowitz",
    license: "Unknown (web image)",
  },
  gyekye: {
    pageTitle: "Kwame Gyekye",
    url: "https://africafeeds.com/wp-content/uploads/2019/04/Prof.-Gyekye.jpg",
    sourceUrl:
      "https://africafeeds.com/2019/04/30/opinion-a-tribute-to-emeritus-prof-kwame-gyekye/",
    license: "Unknown (web image)",
  },
  mbiti: {
    pageTitle: "John Mbiti",
    url: "https://images.squarespace-cdn.com/content/v1/586d154f03596e5605562ea7/1570858692894-2YYGL77WRE45GGV7XPTK/Mbiti?format=1200w",
    sourceUrl:
      "https://religionunplugged.com/news/2019/10/12/mourning-the-death-of-john-samuel-mbiti-father-of-modern-african-theology",
    license: "Unknown (web image)",
  },
  menkiti: {
    pageTitle: "Ifeanyi Menkiti",
    url: "https://live.staticflickr.com/4260/35321452631_cdd7f2a4bc_b.jpg",
    sourceUrl: "https://www.flickr.com/photos/cambridgeroom/35321452631/",
    license: "Unknown (Flickr image)",
    crop: "centre",
  },
  ramose: {
    pageTitle: "Mogobe Ramose",
    url: "https://i.ytimg.com/vi/FPFqBPs3t1o/maxresdefault.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=FPFqBPs3t1o",
    license: "Unknown (web image)",
  },
  deloria: {
    pageTitle: "Vine Deloria Jr.",
    url: "https://upload.wikimedia.org/wikipedia/en/6/63/Vine_Deloria.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Vine_Deloria_Jr.",
    license: "Non-free (Wikipedia)",
  },
  simpson: {
    pageTitle: "Leanne Betasamosake Simpson",
    url: "https://www.theglobeandmail.com/ece-images/abd/arts/books-and-media/article36919787.ece/BINARY/image.jpg",
    sourceUrl:
      "https://www.theglobeandmail.com/arts/books-and-media/nominees-for-the-rogers-writers-trust-fiction-prize-discuss-their-storytellingprocesses/article36921252/",
    license: "Unknown (web image)",
  },
  ermine: {
    pageTitle: "Willie Ermine",
    url: "https://www.design.iastate.edu/wp-content/uploads/2023/02/Ermine-Willie600x593.jpg",
    sourceUrl: "https://www.design.iastate.edu/news/willie-ermine-elwood-lecture/",
    license: "Unknown (university photo)",
  },
  alfred: {
    pageTitle: "Taiaiake Alfred",
    url: "https://i.pinimg.com/736x/17/5d/58/175d5828a65a16374b1b4e8359e27d7e.jpg",
    sourceUrl:
      "https://www.pinterest.com/pin/mohawk-warrior-taiaiake-alfred-on-native-resurgence--764274999245358840/",
    license: "Unknown (web image)",
  },
  "li-si": {
    pageTitle: "Li Si",
    url: "https://i.pinimg.com/originals/c9/0a/39/c90a39bf0fd1732168774df2b15a5d73.png",
    sourceUrl: "https://www.pinterest.com/pin/li-si-qin-dynasty-epic--836473330788510964/",
    license: "Unknown (web image)",
    note: "Modern dramatic depiction",
  },
  "shen-buhai": {
    pageTitle: "Shen Buhai",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Statue_Of_Han_Fei.png/960px-Statue_Of_Han_Fei.png",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Statue_Of_Han_Fei.png",
    author: "Sabinowitz",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    note: "Representative Legalist image; no contemporary portrait survives",
    crop: "north",
  },
  badarayana: {
    pageTitle: "Badarayana",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/da/Vyasa-naimisharanya.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Vyasa-naimisharanya.jpg",
    author: "Tantrik71",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    note: "Vyasa, traditionally identified with Badarayana",
    crop: "north",
  },
  ishvarakrishna: {
    pageTitle: "Ishvarakrishna",
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Kapila_%28cropped%29.png/960px-Kapila_%28cropped%29.png",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kapila_(cropped).png",
    license: "Public domain",
    note: "Representative Samkhya image; no contemporary portrait survives",
    crop: "north",
    extract: { left: 0, top: 0, width: 960, height: 760 },
  },
  zeami: {
    pageTitle: "Zeami Motokiyo",
    url: "https://biographs.org/images/69/69395/motokiyo-zeami-1.jpg",
    sourceUrl: "https://biographs.org/motokiyo-zeami",
    license: "Unknown (web image)",
  },
  suits: {
    pageTitle: "Bernard Suits",
    url: "https://uwaterloo.ca/philosophy/sites/default/files/uploads/images/suits_bernard.png",
    sourceUrl: "https://uwaterloo.ca/philosophy/bernard-suits",
    license: "Unknown (university portrait)",
    crop: "north",
  },
};

async function fileExists(filename: string): Promise<boolean> {
  try {
    await access(filename);
    return true;
  } catch {
    return false;
  }
}

async function fetchImage(portrait: WebPortrait): Promise<Buffer> {
  const headers = {
    "user-agent": BROWSER_UA,
    accept: "image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8",
    referer: encodeURI(portrait.sourceUrl),
  };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(portrait.url, { headers, redirect: "follow" });
    if (response.ok) {
      const type = response.headers.get("content-type") ?? "";
      if (type.startsWith("image/") || portrait.url.endsWith(".jpg") || portrait.url.endsWith(".png")) {
        return Buffer.from(await response.arrayBuffer());
      }
    }
    if (response.status === 429) {
      await sleep(10_000);
      continue;
    }
    await sleep(1500);
  }
  throw new Error(`could not download ${portrait.url}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let manifest: Record<string, PortraitRecord> = {};
  try {
    manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    manifest = {};
  }

  const failures: string[] = [];
  let downloaded = 0;

  for (const [id, portrait] of Object.entries(WEB_PORTRAITS)) {
    const filename = path.join(OUT_DIR, `${id}.webp`);
    if (await fileExists(filename)) {
      manifest[id] = {
        src: `/portraits/${id}.webp`,
        pageTitle: portrait.pageTitle,
        sourceUrl: portrait.sourceUrl,
        author: portrait.author,
        license: portrait.license,
        licenseUrl: portrait.licenseUrl,
        note: portrait.note,
      };
      continue;
    }

    try {
      const buffer = await fetchImage(portrait);
      const pipeline = portrait.extract
        ? sharp(buffer).extract(portrait.extract)
        : sharp(buffer);
      await pipeline
        .resize(256, 256, { fit: "cover", position: portrait.crop ?? "centre" })
        .webp({ quality: 82 })
        .toFile(filename);

      manifest[id] = {
        src: `/portraits/${id}.webp`,
        pageTitle: portrait.pageTitle,
        sourceUrl: portrait.sourceUrl,
        author: portrait.author,
        license: portrait.license,
        licenseUrl: portrait.licenseUrl,
        note: portrait.note,
      };
      downloaded += 1;
      console.log(`OK ${id} — ${portrait.pageTitle}`);
    } catch (error) {
      failures.push(id);
      console.log(`FAIL ${id} — ${error instanceof Error ? error.message : error}`);
    }

    await sleep(700);
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`\nDownloaded ${downloaded}; failures: ${failures.length}`);
  if (failures.length) console.log(`Failed: ${failures.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
