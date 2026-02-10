'use client';

import { SiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';
import config from '../../package.json';
import { removeLastTrailingSlash } from 'lib/util';

export default function ProvidersWrapper({ children, siteData = {} }) {
  let homepage = siteData.metadata?.url || config.homepage || '';
  homepage = removeLastTrailingSlash(homepage);

  const site = {
    ...siteData,
    homepage,
    notices: undefined,
    clearNotices: () => {},
  };

  return (
    <SiteContext.Provider value={site}>
      <SearchProvider>{children}</SearchProvider>
    </SiteContext.Provider>
  );
}
