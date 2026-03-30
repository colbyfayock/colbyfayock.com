import 'styles/globals.scss';

import PlausibleProvider from 'next-plausible';
import ProvidersWrapper from './providers';
import { getSiteMetadata } from 'lib/site';

// Default metadata that will be merged with page-specific metadata
export async function generateMetadata() {
  const metadata = await getSiteMetadata();

  return {
    metadataBase: new URL(metadata.url),
    title: {
      template: `%s - ${metadata.title}`,
      default: metadata.title,
    },
    description: metadata.description,
    openGraph: {
      type: 'website',
      siteName: metadata.title,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
    },
    alternates: {
      types: {
        'application/rss+xml': '/feed.xml',
      },
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
}

export default async function RootLayout({ children }) {
  // Fetch site metadata server-side for the providers
  const metadata = await getSiteMetadata();

  const siteData = {
    metadata,
    menus: [],
    navigation: {},
  };

  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="colbyfayock.com" trackOutboundLinks={true} />
      </head>
      <body>
        <ProvidersWrapper siteData={siteData}>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
