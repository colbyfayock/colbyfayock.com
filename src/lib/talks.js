import { fetchAPI } from 'lib/api';

export async function getTalkByUri(uri) {
  const query = `
    query TalkByUri($uri: ID!) {
      talk(id: $uri, idType: URI) {
        content
        id
        slug
        title
        uri
        talk {
          talk {
            ... on EventNote {
              id
              title
              uri
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query, { uri });

  if (!data?.talk) {
    return { talk: undefined };
  }

  const talk = { ...data.talk };
  talk.events = talk.talk?.talk || [];
  delete talk.talk;

  return { talk };
}

export async function getTalkByUriSlug(uriSlug) {
  return getTalkByUri(`/talks/${uriSlug}`);
}

export async function getAllTalks() {
  const query = `
    query AllTalks {
      talks(first: 100) {
        edges {
          node {
            id
            slug
            title
            uri
            talk {
              talk {
                ... on EventNote {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const talks =
    data?.talks?.edges?.map(({ node }) => {
      const talk = { ...node };
      talk.events = talk.talk?.talk || [];
      delete talk.talk;
      return talk;
    }) || [];

  return { talks };
}
