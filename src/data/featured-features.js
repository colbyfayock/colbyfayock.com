import { gql } from '@apollo/client';

export const QUERY_ALL_FEATURED_FEATURES = gql`
  query AllFeaturedFeatures {
    featuredFeatures(first: 100) {
      edges {
        node {
          content
          featuredFeature {
            featureUrl
          }
          id
          title
          slug
        }
      }
    }
  }
`;
