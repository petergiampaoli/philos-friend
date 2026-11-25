import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import sharp from "sharp";
import { THINKERS } from "../data/thinkers";

type PortraitRecord = {
  src: string;
  pageTitle?: string;
  sourceUrl?: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
};

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "portraits");
const MANIFEST = path.join(ROOT, "data", "portraits.json");
const USER_AGENT = "Philos-Friend/0.1 (local portrait fetch; contact: local operator)";

const TITLE_OVERRIDES: Record<string, string> = {
  buddha: "The Buddha",
  averroes: "Averroes",
  "ibn-sina": "Avicenna",
  "al-ghazali": "Al-Ghazali",
  shantideva: "Shantideva",
  nagarjuna: "Nagarjuna",
  patanjali: "Patanjali",
  ishvarakrishna: "Ishvarakrishna",
  "aksapada-gautama": "Aksapada Gautama",
  mahavira: "Mahavira",
  dogen: "Dōgen",
  hakuin: "Hakuin Ekaku",
  nishida: "Kitarō Nishida",
  tanabe: "Hajime Tanabe",
  nishitani: "Keiji Nishitani",
  zeami: "Zeami Motokiyo",
  kenko: "Yoshida Kenkō",
  chomei: "Kamo no Chōmei",
  kukai: "Kūkai",
  shankara: "Adi Shankara",
  vasubandhu: "Vasubandhu",
  dharmakirti: "Dharmakīrti",
  "zera-yacob": "Zera Yacob",
  amo: "Anton Wilhelm Amo",
  gyekye: "Kwame Gyekye",
  ramose: "Mogobe Ramose",
  "tuhiwai-smith": "Linda Tuhiwai Smith",
  simpson: "Leanne Betasamosake Simpson",
  ermine: "Willie Ermine",
  alfred: "Taiaiake Alfred",
  mariategui: "José Carlos Mariátegui",
  anzaldua: "Gloria Anzaldúa",
  mignolo: "Walter Mignolo",
  deloria: "Vine Deloria Jr.",
  mbiti: "John Mbiti",
  menkiti: "Ifeanyi Menkiti",
  "taylor-mill": "Harriet Taylor Mill",
  oneill: "Onora O'Neill",
  "bell-hooks": "bell hooks",
  "alexander-aphrodisias": "Alexander of Aphrodisias",
  "pseudo-dionysius": "Pseudo-Dionysius the Areopagite",
  scotus: "Duns Scotus",
  ockham: "William of Ockham",
  malebranche: "Nicolas Malebranche",
  wolff: "Christian Wolff (philosopher)",
  reid: "Thomas Reid",
  ross: "W. D. Ross",
  anscombe: "G. E. M. Anscombe",
  foot: "Philippa Foot",
  held: "Virginia Held",
  kittay: "Eva Feder Kittay",
  tronto: "Joan Tronto",
  noddings: "Nel Noddings",
  macintyre: "Alasdair MacIntyre",
  rawls: "John Rawls",
  kripke: "Saul Kripke",
  austin: "J. L. Austin",
  ryle: "Gilbert Ryle",
  davidson: "Donald Davidson",
  dennett: "Daniel Dennett",
  kuhn: "Thomas Kuhn",
  lakatos: "Imre Lakatos",
  feyerabend: "Paul Feyerabend",
  rorty: "Richard Rorty",
  mead: "George Herbert Mead",
  james: "William James",
  peirce: "Charles Sanders Peirce",
  dewey: "John Dewey",
  weil: "Simone Weil",
  leopold: "Aldo Leopold",
  naess: "Arne Næss",
  rolston: "Holmes Rolston III",
  plumwood: "Val Plumwood",
  thoreau: "Henry David Thoreau",
  schiller: "Friedrich Schiller",
  suits: "Bernard Suits",
  huizinga: "Johan Huizinga",
  schopenhauer: "Arthur Schopenhauer",
  marx: "Karl Marx",
  engels: "Friedrich Engels",
  gramsci: "Antonio Gramsci",
  adorno: "Theodor W. Adorno",
  marcuse: "Herbert Marcuse",
  kierkegaard: "Søren Kierkegaard",
  nietzsche: "Friedrich Nietzsche",
  heidegger: "Martin Heidegger",
  sartre: "Jean-Paul Sartre",
  beauvoir: "Simone de Beauvoir",
  husserl: "Edmund Husserl",
  levinas: "Emmanuel Levinas",
  "merleau-ponty": "Maurice Merleau-Ponty",
  gadamer: "Hans-Georg Gadamer",
  camus: "Albert Camus",
  dostoevsky: "Fyodor Dostoevsky",
  kafka: "Franz Kafka",
  bentham: "Jeremy Bentham",
  mill: "John Stuart Mill",
  sidgwick: "Henry Sidgwick",
  singer: "Peter Singer",
  parfit: "Derek Parfit",
  wittgenstein: "Ludwig Wittgenstein",
  quine: "Willard Van Orman Quine",
  putnam: "Hilary Putnam",
  popper: "Karl Popper",
  frege: "Gottlob Frege",
  russell: "Bertrand Russell",
  moore: "G. E. Moore",
  korsgaard: "Christine Korsgaard",
  gilligan: "Carol Gilligan",
  wollstonecraft: "Mary Wollstonecraft",
  lugones: "María Lugones",
  confucius: "Confucius",
  mencius: "Mencius",
  "zhu-xi": "Zhu Xi",
  "wang-yangming": "Wang Yangming",
  laozi: "Laozi",
  liezi: "Liezi",
  "wang-bi": "Wang Bi",
  "guo-xiang": "Guo Xiang",
  mozi: "Mozi",
  "han-feizi": "Han Feizi",
  "li-si": "Li Si",
  "shang-yang": "Shang Yang",
  "shen-buhai": "Shen Buhai",
  badarayana: "Badarayana",
  gaudapada: "Gaudapada",
  ramanuja: "Ramanuja",
  madhva: "Madhvacharya",
  kundakunda: "Kundakunda",
  xunzi: "Xun Kuang",
  zhuangzi: "Zhuang Zhou",
  seneca: "Seneca the Younger",
  porphyry: "Porphyry (philosopher)",
  hegel: "Georg Wilhelm Friedrich Hegel",
};

function cleanTitle(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

async function fileExists(filename: string): Promise<boolean> {
  try {
    await access(filename);
    return true;
  } catch {
    return false;
  }
}

function sourceFromImageUrl(imageUrl: string): string | undefined {
  const clean = imageUrl.split("?")[0];
  const match = clean.match(/\/wikipedia\/(commons|en)\/(?:thumb\/[0-9a-f]\/[0-9a-f]{2}\/)?([^/]+)$/);
  if (!match) return undefined;
  const [, project, filename] = match;
  return project === "commons"
    ? `https://commons.wikimedia.org/wiki/File:${filename}`
    : `https://en.wikipedia.org/wiki/File:${filename}`;
}

async function getSummary(title: string, attempt = 0): Promise<any | null> {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`,
    { headers: { "user-agent": USER_AGENT, accept: "application/json" } },
  );

  if (response.status === 429 && attempt < 4) {
    await sleep(15_000);
    return getSummary(title, attempt + 1);
  }
  if (!response.ok) return null;
  return response.json();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let manifest: Record<string, PortraitRecord> = {};
  try {
    manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    manifest = {};
  }

  const missing: string[] = [];
  let downloaded = 0;
  let skipped = 0;

  for (const thinker of THINKERS) {
    const filename = path.join(OUT_DIR, `${thinker.id}.webp`);
    if (manifest[thinker.id] && (await fileExists(filename))) {
      skipped += 1;
      continue;
    }

    const title = TITLE_OVERRIDES[thinker.id] ?? cleanTitle(thinker.name);

    try {
      const summary = await getSummary(title);
      const image = summary?.thumbnail?.source as string | undefined;
      if (!image) {
        missing.push(thinker.id);
        console.log(`MISS ${thinker.id} — ${title}`);
        await sleep(1000);
        continue;
      }

      if (image.includes("/wikipedia/en/")) {
        missing.push(thinker.id);
        console.log(`SKIP ${thinker.id} — non-free image path`);
        await sleep(1000);
        continue;
      }

      const imageResponse = await fetch(image, {
        headers: { "user-agent": USER_AGENT },
      });
      if (!imageResponse.ok) throw new Error(`image ${imageResponse.status}`);
      const buffer = Buffer.from(await imageResponse.arrayBuffer());

      await sharp(buffer)
        .resize(256, 256, { fit: "cover", position: "centre" })
        .webp({ quality: 82 })
        .toFile(filename);

      manifest[thinker.id] = {
        src: `/portraits/${thinker.id}.webp`,
        pageTitle: summary.title,
        sourceUrl: sourceFromImageUrl(image),
      };
      downloaded += 1;
      console.log(`OK ${thinker.id} — ${summary.title}`);
      await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    } catch (error) {
      missing.push(thinker.id);
      console.log(`ERR ${thinker.id} — ${error instanceof Error ? error.message : error}`);
    }

    await sleep(1200);
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`\nDownloaded ${downloaded}; skipped ${skipped}; missing ${missing.length}.`);
  if (missing.length) console.log(`Missing: ${missing.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
