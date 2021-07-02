import { gql } from '@apollo/client';

export const QUERY_ALL_PODCASTS = gql`
  query AllPodcasts {
    podcasts(first: 100) {
      edges {
        node {
          content
          id
          podcast {
            datePublished
          }
          slug
          title
        }
      }
    }
  }
`;

export const QUERY_PODCAST_BY_SLUG = gql`
  query PodcastBySlug($slug: ID!) {
    podcast(id: $slug, idType: SLUG) {
      content
      id
      podcast {
        datePublished
      }
      slug
      title
    }
  }
`;
