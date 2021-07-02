import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_PODCASTS, QUERY_PODCAST_BY_SLUG } from 'data/podcasts';

const PREFIX = '[Event Notes]';

/**
 * getPodcastBySlug
 */

export async function getPodcastBySlug(slug) {
  const apolloClient = getApolloClient();

  let podcastData;

  try {
    podcastData = await apolloClient.query({
      query: QUERY_PODCAST_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`${PREFIX}[getPodcastBySlug] Failed to query data: ${e.message}`);
    throw e;
  }

  const podcast = [podcastData?.data.podcast].map(mapPodcastData)[0];

  return {
    podcast,
  };
}

/**
 * getAllPodcasts
 */

export async function getAllPodcasts() {
  const apolloClient = getApolloClient();

  let podcastData;

  try {
    podcastData = await apolloClient.query({
      query: QUERY_ALL_PODCASTS,
    });
  } catch (e) {
    console.log(`${PREFIX}[getAllPodcasts] Failed to query data: ${e.message}`);
    throw e;
  }

  const podcasts = podcastData?.data.podcasts.edges.map(({ node = {} }) => node);

  return {
    podcasts: Array.isArray(podcasts) && podcasts.map(mapPodcastData),
  };
}

/**
 * mapPodcastData
 */

export function mapPodcastData(podcast = {}) {
  const data = { ...podcast };

  return data;
}
