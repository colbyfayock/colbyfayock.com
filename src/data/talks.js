import { gql } from '@apollo/client';

export const QUERY_ALL_TALKS = gql`
  query AllTalks {
    talks {
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

export const QUERY_TALK_BY_SLUG = gql`
  query TalkBySlug($slug: ID!) {
    talk(id: $slug, idType: SLUG) {
      content
      title
      slug
    }
  }
`;
