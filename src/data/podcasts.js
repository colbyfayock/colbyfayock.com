import { gql } from '@apollo/client';

export const QUERY_ALL_PODCASTS = gql`
  query AllPodcasts {
    podcasts {
      edges {
        node {
          content
          title
          slug
        }
      }
    }
  }
`;

export const QUERY_PODCAST_BY_SLUG = gql`
  query PodcastBySlug($slug: ID!) {
    podcast(id: $slug, idType: SLUG) {
      content
      title
      slug
    }
  }
`;
