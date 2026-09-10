/*
 * Build-time project asset discovery.
 *
 * Run `node generate-project-assets.js` after adding, removing or renaming a
 * screenshot inside any project folder. It rewrites `project-assets.generated.js`.
 *
 * Nothing else needs to change when a screenshot is added: covers, brand marks,
 * gallery grouping and image order are all derived from the folder contents.
 *
 * Rules used here
 *  - A file whose name contains "logo" or "brand" becomes the project's brand
 *    mark and is kept out of the screenshot galleries.
 *  - Image sub-folders become gallery groups (Store, Admin, ...). A project with
 *    a flat folder gets a single gallery.
 *  - Screenshots are ordered so the story reads correctly: entry screens first,
 *    catalogue screens next, flow screens in natural order, confirmation and
 *    footer screens last.
 */
const fs = require('fs');
const path = require('path');

/* project id -> source folder in the repository */
const PROJECT_FOLDERS = {
  memora: 'Memora',
  crm: 'CRM',
  'attendance-app': 'Attendance',
  clientview: 'RingRoad',
  stancepro: 'StancePro',
  'money-tracker': 'MoneyTracker',
  'to-do': 'ToDoList',
  'aion-web': 'AION(Wuillt)',
  'aion-store': 'AION(Wuillt)'
};

const IMAGE_PATTERN = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
const BRAND_PATTERN = /logo|brand/i;

/* A project whose logo lives in another project's folder. CRM and ClientView
   are both Ring Road systems and share one brand mark. */
const SHARED_BRANDS = {
  crm: 'RingRoad/RingRoadLogo.jpeg'
};

/* The flat colour a logo file is drawn on, sampled from its own border pixels.
   The card paints the panel in this colour so the artwork sits on its own
   ground instead of showing as a pale rectangle inside a dark box. Logos with a
   transparent background (SVG) are left out and use the site's panel colour. */
const BRAND_PLATES = {
  'Memora/MemoraLogo.jpeg': '#F9F4EE',
  'RingRoad/RingRoadLogo.jpeg': '#FFFFFF',
  'StancePro/StanceProLogo.jpeg': '#000000',
  'AION(Wuillt)/aion-logo.png': '#2F2D2E'
};

/* Human labels for gallery groups. Anything else is title-cased. */
const GROUP_LABELS = {
  store: 'Store',
  shop: 'Store',
  admin: 'Admin Dashboard',
  dashboard: 'Admin Dashboard',
  website: 'Website',
  web: 'Website',
  app: 'Application',
  mobile: 'Mobile'
};

/* Lower weight renders first. */
const GROUP_WEIGHTS = [
  [/store|shop|customer|website|web/i, 0],
  [/admin|dashboard|back\s*office/i, 2]
];

const IMAGE_WEIGHTS = [
  [/^(home|homepage|landing|index|welcome)/i, 0],
  [/(dashboard|dash\s*board|overview)/i, 1],
  [/(product|catalog)/i, 2],
  [/(categor)/i, 2.2],
  [/(bundle)/i, 2.5],
  [/(analytic|analysis|report)/i, 3.5],
  [/(final|confirmation|confirmed|success|thank)/i, 4],
  [/(footer)/i, 5]
];

function weightFor(name, table, fallback) {
  for (const [pattern, weight] of table) {
    if (pattern.test(name)) return weight;
  }
  return fallback;
}

/* "Order step 10" sorts after "Order step 9", not before it. */
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

/* Intrinsic size, read from the file header. Emitting it lets the page reserve
   the right box before an image loads, so galleries never jump. */
function measure(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  try {
    if (extension === '.svg') {
      const text = fs.readFileSync(filePath, 'utf8').slice(0, 2000);
      const viewBox = text.match(/viewBox\s*=\s*["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)/i);
      if (viewBox) return { w: Math.round(+viewBox[1]), h: Math.round(+viewBox[2]) };
      const width = text.match(/\bwidth\s*=\s*["'](\d+)/i);
      const height = text.match(/\bheight\s*=\s*["'](\d+)/i);
      if (width && height) return { w: +width[1], h: +height[1] };
      return null;
    }

    const buffer = fs.readFileSync(filePath);

    if (buffer.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
      return { w: buffer.readUInt32BE(16), h: buffer.readUInt32BE(20) };
    }

    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      let offset = 2;
      while (offset < buffer.length - 9) {
        if (buffer[offset] !== 0xff) {
          offset += 1;
          continue;
        }
        const marker = buffer[offset + 1];
        const size = buffer.readUInt16BE(offset + 2);
        const isFrameHeader = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
        if (isFrameHeader) return { w: buffer.readUInt16BE(offset + 7), h: buffer.readUInt16BE(offset + 5) };
        offset += 2 + size;
      }
      return null;
    }

    if (buffer.slice(0, 3).toString('ascii') === 'GIF') {
      return { w: buffer.readUInt16LE(6), h: buffer.readUInt16LE(8) };
    }
  } catch (error) {
    /* Unreadable or unknown format — the page falls back to fluid sizing. */
  }
  return null;
}

function describe(filePath) {
  const size = measure(filePath);
  return size ? { src: filePath, w: size.w, h: size.h } : { src: filePath };
}

/* 'portrait' when every screen is taller than it is wide — those galleries are
   laid out narrower so phone screens do not float in a wide empty frame. */
function orientationOf(items) {
  const sized = items.filter(item => item.w && item.h);
  if (!sized.length) return 'landscape';
  if (sized.every(item => item.h > item.w)) return 'portrait';
  if (sized.every(item => item.h <= item.w)) return 'landscape';
  return 'mixed';
}

/* Median width/height of a gallery. The page uses it as the frame's
   aspect-ratio, so the frame hugs the screenshots instead of leaving a band of
   empty space above and below them — and it is known before anything loads,
   so nothing shifts. */
function aspectOf(items) {
  const ratios = items.filter(item => item.w && item.h).map(item => item.w / item.h).sort((a, b) => a - b);
  if (!ratios.length) return null;
  const middle = Math.floor(ratios.length / 2);
  const median = ratios.length % 2 ? ratios[middle] : (ratios[middle - 1] + ratios[middle]) / 2;
  return Math.round(median * 1000) / 1000;
}

function baseName(filePath) {
  return path.basename(filePath).replace(IMAGE_PATTERN, '');
}

function sortImages(files) {
  return files.slice().sort((a, b) => {
    const nameA = baseName(a);
    const nameB = baseName(b);
    const delta = weightFor(nameA, IMAGE_WEIGHTS, 3) - weightFor(nameB, IMAGE_WEIGHTS, 3);
    return delta !== 0 ? delta : collator.compare(nameA, nameB);
  });
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function readFolder(folder) {
  if (!fs.existsSync(folder)) return { images: [], folders: [] };
  const entries = fs.readdirSync(folder, { withFileTypes: true });
  return {
    images: entries
      .filter(entry => entry.isFile() && IMAGE_PATTERN.test(entry.name))
      .map(entry => toPosix(path.join(folder, entry.name))),
    folders: entries.filter(entry => entry.isDirectory()).map(entry => entry.name)
  };
}

function labelFor(folderName) {
  const key = folderName.toLowerCase().replace(/[^a-z]/g, '');
  if (GROUP_LABELS[key]) return GROUP_LABELS[key];
  return folderName
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, character => character.toUpperCase());
}

function collectProject(id, folder) {
  const root = readFolder(folder);
  const brandCandidates = root.images.filter(image => BRAND_PATTERN.test(path.basename(image)));
  const brand = brandCandidates[0] || SHARED_BRANDS[id] || null;

  const groups = [];
  const rootScreens = sortImages(root.images.filter(image => image !== brand));
  if (rootScreens.length) groups.push({ id: 'main', title: null, weight: -1, images: rootScreens });

  for (const child of root.folders) {
    const childPath = path.join(folder, child);
    const childImages = sortImages(
      readFolder(childPath).images.filter(image => !BRAND_PATTERN.test(path.basename(image)))
    );
    if (!childImages.length) continue;
    groups.push({
      id: child.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: labelFor(child),
      weight: weightFor(child, GROUP_WEIGHTS, 1),
      images: childImages
    });
  }

  groups.sort((a, b) => a.weight - b.weight);
  const images = groups.flatMap(group => group.images).map(describe);
  let consumed = 0;

  /* The card leads with the project's own logo. A screenshot is the cover only
     when no logo exists for that project. */
  const mark = brand ? { ...describe(brand), plate: BRAND_PLATES[brand] || null } : null;

  return {
    brand: mark,
    cover: mark || images[0] || null,
    images,
    groups: groups.map(({ id, title, images: groupImages }) => {
      const items = images.slice(consumed, consumed + groupImages.length);
      consumed += groupImages.length;
      return { id, title, orientation: orientationOf(items), aspect: aspectOf(items), images: items };
    })
  };
}

const assets = {};
for (const [id, folder] of Object.entries(PROJECT_FOLDERS)) {
  assets[id] = collectProject(id, folder);
}

const banner = '// Generated by `node generate-project-assets.js` — do not edit by hand.\n';
fs.writeFileSync(
  'project-assets.generated.js',
  `${banner}window.portfolioProjectAssets = ${JSON.stringify(assets, null, 2)};\n`
);

const summary = Object.entries(assets)
  .map(
    ([id, data]) =>
      `  ${id}: logo ${data.brand ? data.brand.src : 'MISSING'}, ` +
      `${data.images.length} screenshot(s), ${data.groups.length} gallery group(s)`
  )
  .join('\n');
console.log(`project-assets.generated.js written\n${summary}`);
