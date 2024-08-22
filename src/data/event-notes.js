import { gql } from '@apollo/client';

export const QUERY_ALL_EVENT_NOTES = gql`
  query AllEventNotes {
    eventNotes(first: 100) {
      edges {
        node {
          content
          eventNote {
            eventslides {
              mediaItemUrl
            }
            eventtype
            talk {
              ... on Talk {
                id
                title
              }
            }
          }
          id
          title
          slug
        }
      }
    }
  }
`;

export const QUERY_EVENT_NOTE_BY_SLUG = gql`
  query EventNoteBySlug($slug: ID!) {
    eventNote(id: $slug, idType: SLUG) {
      content
      id
      eventNote {
        eventslides {
          mediaItemUrl
        }
        eventtype
        mediaembed
        talk {
          ... on Talk {
            id
            title
          }
        }
      }
      title
      slug
    }
  }
`;
