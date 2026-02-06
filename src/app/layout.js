import 'styles/globals.scss';

import ProvidersWrapper from './providers';
import { getSiteMetadata } from 'lib/site';

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
      <body>
        <ProvidersWrapper siteData={siteData}>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
