import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NextApp from 'next/app';
import PlausibleProvider from 'next-plausible';

import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';

import { getSiteMetadata } from 'lib/site';
// import { getRecentPosts } from 'lib/posts';
import { getTopLevelPages } from 'lib/pages';
// import { getCategories } from 'lib/categories';
import { getAllMenus, createMenuFromPages, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';
import { pageview } from 'lib/gtag';

import 'styles/globals.scss';

function App({ Component, pageProps = {}, metadata, menus }) {
  const { events } = useRouter();

  const site = useSiteContext({
    metadata,
    // recentPosts,
    // categories,
    menus,
  });

  useEffect(() => {
    events.on('routeChangeComplete', pageview);
    return () => {
      events.off('routeChangeComplete', pageview);
    };
  }, [events]);

  return (
    <PlausibleProvider domain="colbyfayock.com" trackOutboundLinks={true}>
      <SiteContext.Provider value={site}>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </SiteContext.Provider>
    </PlausibleProvider>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  // const { posts: recentPosts } = await getRecentPosts({
  //   count: 5,
  // });

  // const { categories } = await getCategories({
  //   count: 5,
  // });

  const { menus } = await getAllMenus();

  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages(),
  });

  menus.push(defaultNavigation);

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
    // recentPosts,
    // categories,
    menus,
  };
};

export default App;
