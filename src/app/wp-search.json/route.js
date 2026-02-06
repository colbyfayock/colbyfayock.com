import he from 'he';

const WORDPRESS_API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

async function fetchAPI(query, variables = {}) {
  const response = await fetch(WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
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

async function getAllPosts() {
  const query = `
    {
      posts(first: 10000) {
        edges {
          node {
            title
            excerpt
            postId
            slug
            date
            modified
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const nodes = [...data.posts.edges.map(({ node = {} }) => node)];

  const posts = nodes.map((post) => {
    return {
      title: post.title,
      slug: post.slug,
      date: post.date,
    };
  });

  return posts;
}

function generateIndexSearch({ posts }) {
  const index = posts.map((post = {}) => {
    const title = he.decode(post.title);

    return {
      title,
      slug: post.slug,
      date: post.date,
    };
  });

  const indexJson = JSON.stringify({
    generated: Date.now(),
    posts: index,
  });

  return indexJson;
}

export async function GET() {
  try {
    const posts = await getAllPosts();
    const indexJson = generateIndexSearch({ posts });

    return new Response(indexJson, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('[wp-search.json] Error generating search index:', error);
    return new Response('Error generating search index', { status: 500 });
  }
}
