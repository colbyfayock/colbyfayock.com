import { removeLastTrailingSlash } from 'lib/util';

export async function gql({ query, variables, method = 'POST' }) {
  const url = removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT);
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
        tags: [query],
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
        tags: [query],
      },
    }).then((r) => r.json());
  }

  return data;
}
