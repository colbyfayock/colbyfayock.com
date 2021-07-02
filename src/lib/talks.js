import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_TALKS, QUERY_TALK_BY_URI, TALKS_ROOT_SLUG } from 'data/talks';
import { removeLastTrailingSlash } from 'lib/util';

const PREFIX = '[Talks]';

/**
 * getTalkByUri
 */

export async function getTalkByUri(uri) {
  const apolloClient = getApolloClient();

  let talkData;

  try {
    talkData = await apolloClient.query({
      query: QUERY_TALK_BY_URI,
      variables: {
        uri,
      },
    });
  } catch (e) {
    console.log(`${PREFIX}[getTalkByUri] Failed to query data: ${e.message}`);
    throw e;
  }

  const talk = [talkData?.data.talk].map(mapTalkData)[0];

  return {
    talk,
  };
}

/**
 * getTalkByUriSlug
 */

export async function getTalkByUriSlug(uriSlug) {
  return getTalkByUri(`/${TALKS_ROOT_SLUG}/${uriSlug}`);
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

  data.uriSlug = data.uri ? removeLastTrailingSlash(data.uri.replace(`/${TALKS_ROOT_SLUG}/`, '')) : null;

  if (data.parent) {
    data.parent = { ...data.parent.node };
  }

  if (data.children) {
    data.children = data.children.edges.map(({ node }) => node);
  }

  return data;
}
