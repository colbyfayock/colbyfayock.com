import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_EVENT_NOTES, QUERY_EVENT_NOTE_BY_SLUG } from 'data/event-notes';

const PREFIX = '[Event Notes]';

/**
 * getEventNoteBySlug
 */

export async function getEventNoteBySlug(slug) {
  const apolloClient = getApolloClient();

  let eventNoteData;

  try {
    eventNoteData = await apolloClient.query({
      query: QUERY_EVENT_NOTE_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`${PREFIX}[getEventNoteBySlug] Failed to query data: ${e.message}`);
    throw e;
  }

  const eventNote = [eventNoteData?.data.eventNote].map(mapEventNoteData)[0];

  return {
    eventNote,
  };
}

/**
 * getAllEventNotes
 */

export async function getAllEventNotes() {
  const apolloClient = getApolloClient();

  let eventNoteData;

  try {
    eventNoteData = await apolloClient.query({
      query: QUERY_ALL_EVENT_NOTES,
    });
  } catch (e) {
    console.log(`${PREFIX}[getAllEventNotes] Failed to query data: ${e.message}`);
    throw e;
  }

  const eventNotes = eventNoteData?.data.eventNotes.edges.map(({ node = {} }) => node);

  return {
    eventNotes: Array.isArray(eventNotes) && eventNotes.map(mapEventNoteData),
  };
}

/**
 * mapEventNoteData
 */

export function mapEventNoteData(eventNote = {}) {
  const data = {
    ...eventNote,
    ...eventNote.eventNote,
  };

  data.eventType = data.eventtype;
  data.eventSlides = data.eventslides;
  data.talkTitle = data.talktitle;

  delete data.eventtype;
  delete data.eventslides;
  delete data.talktitle;

  return data;
}
