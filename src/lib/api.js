const WORDPRESS_API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

export async function fetchAPI(query, variables = {}) {
  const response = await fetch(WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from WordPress: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}
