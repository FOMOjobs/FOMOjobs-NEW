import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  imageUrl?: string;
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  category?: string;
  keywords?: string[];
  isBlogPost?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'FOMOjobs - Portal pracy i rozwoju kariery',
  description = 'FOMOjobs - znajdź wymarzoną pracę szybciej niż inni. Automatyczne wyszukiwanie ofert, kreator CV, coaching rozmów kwalifikacyjnych i tracker aplikacji.',
  type = 'website',
  name = 'FOMOjobs',
  imageUrl = '/og-image.png',
  publishDate,
  modifiedDate,
  author,
  category,
  keywords = [
    'praca Kraków',
    'oferty pracy',
    'szukanie pracy',
    'kreator CV',
    'rozmowa kwalifikacyjna',
    'kariera',
    'rozwój zawodowy',
    'portal pracy',
    'aplikacje o pracę',
    'coaching kariery'
  ],
  isBlogPost = false
}) => {
  const location = useLocation();
  const currentUrl = `https://fomojobs.pl${location.pathname}`;
  const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://fomojobs.pl${imageUrl}`;

  // Create Organization JSON-LD structured data
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FOMOjobs',
    url: 'https://fomojobs.pl',
    logo: absoluteImageUrl,
    description: 'Portal pracy i rozwoju kariery - znajdź pracę szybciej',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'kontakt@fomojobs.pl',
      areaServed: 'PL',
      availableLanguage: 'Polish'
    },
    sameAs: [
      'https://www.linkedin.com/company/fomojobs',
      'https://www.facebook.com/fomojobs'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kraków',
      addressCountry: 'PL'
    }
  };

  // BlogPosting JSON-LD structured data
  const blogPostStructuredData = isBlogPost && publishDate ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl
    },
    headline: title,
    image: {
      '@type': 'ImageObject',
      url: absoluteImageUrl,
      width: 1200,
      height: 630
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      '@type': 'Organization',
      name: author || 'FOMOjobs',
      url: 'https://fomojobs.pl'
    },
    publisher: {
      '@type': 'Organization',
      name: 'FOMOjobs',
      logo: {
        '@type': 'ImageObject',
        url: absoluteImageUrl,
        width: 512,
        height: 512
      },
      url: 'https://fomojobs.pl'
    },
    description: description,
    keywords: keywords.join(', '),
    articleSection: category,
    inLanguage: 'pl-PL',
    isAccessibleForFree: true
  } : null;

  // Combine keywords
  const keywordString = category
    ? [...keywords, category.toLowerCase()].join(', ')
    : keywords.join(', ');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      <meta name="keywords" content={keywordString} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isBlogPost ? 'article' : type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="FOMOjobs" />
      <meta property="og:locale" content="pl_PL" />
      {isBlogPost && category && <meta property="article:section" content={category} />}
      {isBlogPost && publishDate && <meta property="article:published_time" content={publishDate} />}
      {isBlogPost && modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      {isBlogPost && <meta property="article:publisher" content="https://fomojobs.pl" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* LinkedIn specific */}
      <meta property="og:image:secure_url" content={absoluteImageUrl} />
      <meta name="author" content={author || name} />

      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>

      {blogPostStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(blogPostStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
