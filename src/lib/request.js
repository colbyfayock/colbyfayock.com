import { removeLastTrailingSlash } from 'lib/util';

let cachedResult = {};

// Temp hack to get around WP Engine / Netlify build issues with 504 timeouts

export async function requestCachedData(request, cacheKey) {
  // Check if the result is cached and the specified interval has not passed

  if (!cachedResult[cacheKey]) {
    cachedResult[cacheKey] = {
      data: undefined,
      time: 0,
    };
  }

  if (cachedResult[cacheKey].data && Date.now() - cachedResult[cacheKey].time < 60000) {
    return cachedResult[cacheKey].data;
  }

  // Perform the asynchronous operation (replace with your own async logic)
  const result = await request;

  // Cache the result and update the last fetch time
  cachedResult[cacheKey].data = result;
  cachedResult[cacheKey].time = Date.now();

  return result;
}

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
