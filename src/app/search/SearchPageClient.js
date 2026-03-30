'use client';

import { useEffect } from 'react';

import useSearch from 'hooks/use-search';

import TemplateArchive from 'templates/archive';

export default function SearchPageClient() {
  const { query, results, search } = useSearch();
  const title = 'Search';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    search({
      query: params.get('q'),
    });
  }, [search]);

  return (
    <TemplateArchive
      title={title}
      posts={results}
      slug="search"
      metadata={{ title, description: `Search results for ${query}`, robots: 'noindex' }}
    />
  );
}
