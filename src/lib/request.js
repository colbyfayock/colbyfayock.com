import { removeLastTrailingSlash } from 'lib/util';

/**
 * Creates a valid cache tag from a query string.
 * Cache tags must be valid HTTP header values (no special characters like {, }, newlines).
 */
function createCacheTag(query) {
  // Extract the operation name or first field from the query for a readable tag
  const match = query.match(/(?:query|mutation)?\s*(\w+)|{\s*(\w+)/);
  const identifier = match?.[1] || match?.[2] || 'gql';
  // Create a simple hash of the query for uniqueness
  const hash = query.split('').reduce((acc, char) => {
    return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
  }, 0);
  return `${identifier}-${Math.abs(hash)}`;
}

export async function gql({ query, variables, method = 'POST' }) {
  const url = removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT);
  const cacheTag = createCacheTag(query);
  let data;

  if (method === 'POST') {
    data = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        tags: [cacheTag],
      },
    }).then((r) => r.json());
  } else if (method === 'GET') {
    if (typeof variables !== 'undefined') {
      throw new Error('Can not use variables with GET requests');
    }

    data = await fetch(`${url}?query=${query.replaceAll(/\s/g, '')}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: [cacheTag],
      },
    }).then((r) => r.json());
  }

  return data;
}
