import { products } from '../data/products';
import { posts } from '../data/journal';

const SITE_URL = 'https://briarandbeam.com';

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.9, changefreq: 'monthly' },
  { path: '/journal', priority: 0.9, changefreq: 'weekly' },
  { path: '/shipping', priority: 0.5, changefreq: 'monthly' },
  { path: '/returns', priority: 0.5, changefreq: 'monthly' },
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap() {
  const today = '2026-06-30';

  const staticEntries = STATIC_PAGES.map((p) => ({
    loc: `${SITE_URL}${p.path}`,
    lastmod: today,
    priority: p.priority,
    changefreq: p.changefreq,
  }));

  const productEntries = products.map((p) => ({
    loc: `${SITE_URL}/products/${p.slug}`,
    lastmod: today,
    priority: 0.8,
    changefreq: 'weekly',
    images: (p.images || [p.image]).map((img) => ({
      url: img.startsWith('http') ? img : `${SITE_URL}${img}`,
      title: `${p.name} — ${p.category}`,
      caption: `${p.name}: ${p.description.slice(0, 120)}`,
    })),
  }));

  const journalEntries = posts.map((p) => ({
    loc: `${SITE_URL}/journal/${p.slug}`,
    lastmod: p.date,
    priority: 0.7,
    changefreq: 'monthly',
    images: [{
      url: p.image.startsWith('http') ? p.image : `${SITE_URL}${p.image}`,
      title: p.title,
      caption: p.excerpt,
    }],
  }));

  const urls = [...staticEntries, ...productEntries, ...journalEntries];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map((u) => {
    const imageTags = (u.images || [])
      .map(
        (img) => `    <image:image>
      <image:loc>${escapeXml(img.url)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`
      )
      .join('\n');
    return `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${imageTags ? '\n' + imageTags : ''}
  </url>`;
  })
  .join('\n')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSitemap());
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
