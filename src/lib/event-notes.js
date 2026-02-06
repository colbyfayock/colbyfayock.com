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
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const eventNotes =
    data?.eventNotes?.edges?.map(({ node }) => {
      const eventNote = {
        ...node,
      };
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
      }
    }
  `;

  const data = await fetchAPI(query, { slug });

  if (!data?.eventNote) {
    return { eventNote: undefined };
  }

  const eventNote = {
    ...data.eventNote,
  };

  return { eventNote };
}
