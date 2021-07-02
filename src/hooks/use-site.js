import { useContext, createContext, useState, useEffect } from 'react';

import config from '../../package.json';

import { removeLastTrailingSlash } from 'lib/util';

export const SiteContext = createContext();

const NOTICES = {
  emailSignup: {
    success: {
      message: 'Thanks for signing up for my newsletter! 🤗',
    },
  },
  newsletterUnsubscribe: {
    success: {
      message: 'Sorry to see you go... 😢 Successfully unsubscribed!',
    },
  },
};

/**
 * useSiteContext
 */

export function useSiteContext(data) {
  const [notices, setNotices] = useState();

  let { homepage = '' } = config;

  // Trim the trailing slash from the end of homepage to avoid
  // double // issues throughout the metadata

  homepage = removeLastTrailingSlash(homepage);

  // If we find a URL parameter that matches one of our available messages, set it into state
  // on first render so we can display to the visitor

  useEffect(() => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const activeParams = Object.keys(NOTICES).filter((key) => params.has(key));

    const noticesToShow = activeParams
      .map((key) => NOTICES[key][params.get(key)])
      .filter((notice) => notice && notice.message);

    if (noticesToShow.length > 0) {
      setNotices(noticesToShow);
      setTimeout(() => handleClearNotices(), 5000);
    }
  }, []);

  /**
   * handleClearNotices
   */

  function handleClearNotices() {
    setNotices(undefined);
  }

  return {
    ...data,
    homepage,
    notices,
    clearNotices: handleClearNotices,
  };
}

/**
 * useSite
 */

export default function useSite() {
  const site = useContext(SiteContext);
  return site;
}
