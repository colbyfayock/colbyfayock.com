import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_FEATURED_FEATURES } from 'data/featured-features';

const PREFIX = '[Featured Features]';

/**
 * getAllFeaturedFeatures
 */

export async function getAllFeaturedFeatures() {
  const apolloClient = getApolloClient();

  let featuredFeatureData;

  try {
    featuredFeatureData = await apolloClient.query({
      query: QUERY_ALL_FEATURED_FEATURES,
    });
  } catch (e) {
    console.log(`${PREFIX}[getAllFeaturedFeatures] Failed to query data: ${e.message}`);
    throw e;
  }

  const featuredFeatures = featuredFeatureData?.data.featuredFeatures.edges.map(({ node = {} }) => node);

  return {
    featuredFeatures: Array.isArray(featuredFeatures) && featuredFeatures.map(mapFeaturedFeatureData),
  };
}

/**
 * mapFeaturedFeatureData
 */

export function mapFeaturedFeatureData(featuredFeature = {}) {
  const data = {
    ...featuredFeature,
    ...featuredFeature.featuredFeature,
  };
  return data;
}
