import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_TALKS, QUERY_TALK_BY_SLUG } from 'data/talks';

const PREFIX = '[Talks]';

/**
 * getTalkBySlug
 */

export async function getTalkBySlug(slug) {
  const apolloClient = getApolloClient();

  let talkData;

  try {
    talkData = await apolloClient.query({
      query: QUERY_TALK_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`${PREFIX}[getTalkBySlug] Failed to query data: ${e.message}`);
    throw e;
  }

  const talk = [talkData?.data.talk].map(mapTalkData)[0];

  return {
    talk,
  };
}

/**
 * getAllTalks
 */

export async function getAllTalks() {
  const apolloClient = getApolloClient();

  let talkData;

  try {
    talkData = await apolloClient.query({
      query: QUERY_ALL_TALKS,
    });
  } catch (e) {
    console.log(`${PREFIX}[getAllTalks] Failed to query data: ${e.message}`);
    throw e;
  }

  const talks = talkData?.data.talks.edges.map(({ node = {} }) => node);

  return {
    talks: Array.isArray(talks) && talks.map(mapTalkData),
  };
}

/**
 * mapTalkData
 */

export function mapTalkData(talk = {}) {
  const data = { ...talk };

  return data;
}
