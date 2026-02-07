import RSS from 'rss';

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

async function getSiteMetadata() {
  const query = `
    {
      generalSettings {
        description
        language
        title
      }
    }
  `;

  const data = await fetchAPI(query);
  let metadata = { ...data.generalSettings };

  if (!metadata.language || metadata.language === '') {
    metadata.language = 'en';
  } else {
    metadata.language = metadata.language.split('_')[0];
  }

  return metadata;
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
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const nodes = [...data.posts.edges.map(({ node = {} }) => node)];

  const posts = nodes.map((post) => {
    const postData = { ...post };

    if (postData.author) {
      postData.author = postData.author.node.name;
    }

    if (postData.categories) {
      postData.categories = postData.categories.edges.map(({ node }) => node.name);
    }

    if (postData.excerpt) {
      const regExHtmlTags = /(<([^>]+)>)/g;
      postData.excerpt = postData.excerpt.replace(regExHtmlTags, '');
    }

    return postData;
  });

  return posts;
}

function generateFeed({ posts = [], metadata = {} }) {
  const homepage = process.env.NEXT_PUBLIC_HOME_URL || 'https://colbyfayock.com';

  const feed = new RSS({
    title: metadata.title || '',
    description: metadata.description,
    site_url: homepage,
    feed_url: `${homepage}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${metadata.title}`,
    language: metadata.language,
    pubDate: new Date(),
  });

  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: `${homepage}/posts/${post.slug}`,
      url: `${homepage}/posts/${post.slug}`,
      date: post.date,
      description: post.excerpt,
      author: post.author,
      categories: post.categories || [],
    });
  });

  return feed.xml({ indent: true });
}

export async function GET() {
  try {
    const [metadata, posts] = await Promise.all([getSiteMetadata(), getAllPosts()]);

    const feedXml = generateFeed({ posts, metadata });

    return new Response(feedXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('[feed.xml] Error generating feed:', error);
    return new Response('Error generating feed', { status: 500 });
  }
}
