import { fetchAPI } from 'lib/api';

export async function getAllEventNotes() {
  const query = `
    query AllEventNotes {
      eventNotes(first: 100) {
        edges {
          node {
            id
            slug
            title
            uri
            content
            date
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
            eventNote {
              eventtype
              talk {
                ... on Talk {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const eventNotes =
    data?.eventNotes?.edges?.map(({ node }) => {
      const talkArray = node.eventNote?.talk;
      const eventNote = {
        ...node,
        eventType: node.eventNote?.eventtype,
        talk: Array.isArray(talkArray) ? talkArray[0] : talkArray,
      };

      // Clean up nested structure
      delete eventNote.eventNote;

      if (eventNote.featuredImage?.node) {
        eventNote.featuredImage = eventNote.featuredImage.node;
      }
      return eventNote;
    }) || [];

  return { eventNotes };
}

export async function getEventNoteBySlug(slug) {
  const query = `
    query EventNoteBySlug($slug: ID!) {
      eventNote(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        date
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
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
      }
    }
  `;

  const data = await fetchAPI(query, { slug });

  if (!data?.eventNote) {
    return { eventNote: undefined };
  }

  // Flatten the nested eventNote custom fields
  const eventNoteData = data.eventNote;
  const talkArray = eventNoteData.eventNote?.talk;
  const eventNote = {
    ...eventNoteData,
    eventType: eventNoteData.eventNote?.eventtype,
    eventSlides: eventNoteData.eventNote?.eventslides,
    mediaEmbed: eventNoteData.eventNote?.mediaembed,
    talk: Array.isArray(talkArray) ? talkArray[0] : talkArray,
  };

  // Clean up nested structure
  delete eventNote.eventNote;

  if (eventNote.featuredImage?.node) {
    eventNote.featuredImage = eventNote.featuredImage.node;
  }

  return { eventNote };
}
