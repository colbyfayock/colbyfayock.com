import { fetchAPI } from 'lib/api';

export async function getAllFeaturedFeatures() {
  const query = `
    query AllFeaturedFeatures {
      featuredFeatures(first: 100) {
        edges {
          node {
            id
            title
            slug
            content
            featuredFeature {
              featureUrl
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchAPI(query);
    const featuredFeatures =
      data?.featuredFeatures?.edges?.map(({ node }) => {
        const feature = {
          id: node.id,
          title: node.title,
          slug: node.slug,
          content: node.content,
          featureUrl: node.featuredFeature?.featureUrl,
        };
        return feature;
      }) || [];

    return { featuredFeatures };
  } catch (e) {
    console.log(`[featured-features][getAllFeaturedFeatures] Failed to fetch: ${e.message}`);
    return { featuredFeatures: [] };
  }
}
