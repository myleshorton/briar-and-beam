import Head from 'next/head';

const SITE_URL = 'https://briarandbeam.com';
const SITE_NAME = 'Briar & Beam';
const DEFAULT_DESCRIPTION =
  'Heirloom American hardwood furniture, made by hand in Colorado. Solid walnut and white oak — mortise & tenon joinery, hand-rubbed oil finishes. Built once. Kept always.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/julien/julien-1.jpg`;

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  jsonLd,
  noindex = false,
  article,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Heirloom American Hardwood Furniture`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="1200" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific OG (for journal posts) */}
      {article && (
        <>
          <meta property="article:published_time" content={article.published} />
          {article.modified && <meta property="article:modified_time" content={article.modified} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {(article.tags || []).map((t) => (
            <meta property="article:tag" content={t} key={t} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* Theme color */}
      <meta name="theme-color" content="#f7f3ec" />

      {/* Structured data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}

/* ----- Reusable JSON-LD builders ----- */

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  logo: DEFAULT_OG_IMAGE,
  email: 'briarandbeam@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Louisville',
    addressRegion: 'CO',
    addressCountry: 'US',
  },
  sameAs: [],
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'en-US',
  publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}#localbusiness`,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  email: 'briarandbeam@gmail.com',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Louisville',
    addressRegion: 'CO',
    postalCode: '80027',
    addressCountry: 'US',
  },
};

export function productJsonLd(product, selectedSize = null, selectedWood = null) {
  const woodAdjust = selectedWood?.priceAdjust || 0;
  const sizeAdjust = selectedSize?.priceAdjust || 0;
  const price = product.price + woodAdjust + sizeAdjust;
  const productUrl = `${SITE_URL}/products/${product.slug || product.id}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: (product.images || [product.image]).map((img) =>
      img.startsWith('http') ? img : `${SITE_URL}${img}`
    ),
    sku: `BB-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    category: product.category,
    material: product.woodOptions ? product.woodOptions.map((w) => w.name).join(', ') : undefined,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: price,
      availability: 'https://schema.org/MadeToOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: SITE_NAME },
    },
  };
}

export function articleJsonLd(post) {
  const url = `${SITE_URL}/journal/${post.slug}`;
  const image = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: post.category,
    keywords: (post.keywords || []).join(', '),
  };
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export { SITE_URL, SITE_NAME };
