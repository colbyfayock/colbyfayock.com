import { gql } from '@apollo/client';

export const TALKS_ROOT_SLUG = 'talks';

export const QUERY_ALL_TALKS = gql`
  query AllTalks {
    talks(first: 100) {
      edges {
        node {
          content
          slug
          title
          uri
        }
      }
    }
  }
`;

export const QUERY_TALK_BY_URI = gql`
  query TalkByUri($uri: ID!) {
    talk(id: $uri, idType: URI) {
      children {
        edges {
          node {
            ... on Talk {
              id
              title
              uri
            }
          }
        }
      }
      content
      parent {
        node {
          ... on Talk {
            id
            title
            uri
          }
        }
      }
      slug
      title
      uri
    }
  }
`;
