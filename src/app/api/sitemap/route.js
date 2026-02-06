function formatXML(xml) {
  let formatted = '';
  let indent = '';
  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) indent = indent.substring(2);
    formatted += indent + '<' + node + '>\r\n';
    if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith('?')) indent += '  ';
  });
  return formatted.replace(/^\s*\r?\n/, '').replace(/\s*$/, '');
}

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
      slug: post.slug,
      modified: post.modified,
    };
  });

  return posts;
}

async function getPages() {
  const query = `
    {
      pages(first: 10000) {
        edges {
          node {
            slug
            modified
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const pages = [
    ...data.pages.edges.map(({ node = {} }) => {
      return {
        slug: node.slug,
        modified: node.modified,
      };
    }),
  ];

  return pages;
}

function generateSitemap({ posts = [], pages = [] }) {
  const homepage = process.env.NEXT_PUBLIC_HOME_URL || 'https://colbyfayock.com';

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${homepage}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
        ${pages
          .map((page) => {
            return `<url>
                      <loc>${homepage}/${page.slug}</loc>
                      <priority>0.3</priority>
                      <lastmod>${new Date(page.modified).toISOString()}</lastmod>
                    </url>
                `;
          })
          .join('')}
          ${posts
            .map((post) => {
              return `<url>
                        <loc>${homepage}/posts/${post.slug}</loc>
                        <lastmod>${new Date(post.modified).toISOString()}</lastmod>
                      </url>
                  `;
            })
            .join('')}
    </urlset>
    `;

  return sitemap;
}

export async function GET() {
  try {
    const [posts, pages] = await Promise.all([getAllPosts(), getPages()]);

    const sitemap = generateSitemap({ posts, pages });

    const sitemapFormatted = formatXML(sitemap);

    return new Response(sitemapFormatted, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('[sitemap] Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
