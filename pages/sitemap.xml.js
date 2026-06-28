import { products } from '../data/products';

const SITE_URL = 'https://briarandbeam.com';

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.9, changefreq: 'monthly' },
  { path: '/cart', priority: 0.4, changefreq: 'monthly' },
  { path: '/shipping', priority: 0.5, changefreq: 'monthly' },
  { path: '/returns', priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
];

function generateSitemap() {
  const today = '2026-06-28';
  const urls = [
    ...STATIC_PAGES.map((p) => ({
      loc: `${SITE_URL}${p.path}`,
      lastmod: today,
      priority: p.priority,
      changefreq: p.changefreq,
    })),
    ...products.map((p) => ({
      loc: `${SITE_URL}/products/${p.id}`,
      lastmod: today,
      priority: 0.8,
      changefreq: 'weekly',
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
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
