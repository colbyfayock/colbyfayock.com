import { fetchAPI } from 'lib/api';

export async function getPageByUri(uri) {
  const query = `
    query PageByUri($uri: ID!) {
      page(id: $uri, idType: URI) {
        children {
          edges {
            node {
              id
              slug
              uri
              ... on Page {
                id
                title
              }
            }
          }
        }
        content
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
          }
        }
        id
        menuOrder
        modified
        parent {
          node {
            id
            slug
            uri
            ... on Page {
              title
            }
          }
        }
        slug
        title
        uri
      }
    }
  `;

  const data = await fetchAPI(query, { uri });

  if (!data?.page) {
    return { page: undefined };
  }

  const page = { ...data.page };

  if (page.featuredImage) {
    page.featuredImage = page.featuredImage.node;
  }

  if (page.parent?.node) {
    page.parent = page.parent.node;
  }

  if (page.children?.edges) {
    page.children = page.children.edges.map(({ node }) => node);
  }

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    const seoQuery = `
      query PageSEOByUri($uri: ID!) {
        page(id: $uri, idType: URI) {
          id
          seo {
            canonical
            metaDesc
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphAuthor
            opengraphDescription
            opengraphModifiedTime
            opengraphPublishedTime
            opengraphPublisher
            opengraphTitle
            opengraphType
            readingTime
            title
            twitterDescription
            twitterTitle
            twitterImage {
              altText
              sourceUrl
              mediaDetails {
                width
                height
              }
            }
            opengraphImage {
              altText
              sourceUrl
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }
    `;

    try {
      const seoData = await fetchAPI(seoQuery, { uri });
      if (seoData?.page?.seo) {
        const { seo = {} } = seoData.page;
        page.metaTitle = seo.title;
        page.description = seo.metaDesc;
        page.readingTime = seo.readingTime;
        page.canonical = seo.canonical;
        page.og = {
          author: seo.opengraphAuthor,
          description: seo.opengraphDescription,
          image: seo.opengraphImage,
          modifiedTime: seo.opengraphModifiedTime,
          publishedTime: seo.opengraphPublishedTime,
          publisher: seo.opengraphPublisher,
          title: seo.opengraphTitle,
          type: seo.opengraphType,
        };
        page.robots = {
          nofollow: seo.metaRobotsNofollow,
          noindex: seo.metaRobotsNoindex,
        };
        page.twitter = {
          description: seo.twitterDescription,
          image: seo.twitterImage,
          title: seo.twitterTitle,
        };
      }
    } catch (e) {
      console.log(`[pages][getPageByUri] Failed to query SEO plugin: ${e.message}`);
    }
  }

  return { page };
}

export async function getAllPages() {
  const query = `
    {
      pages(first: 10000) {
        edges {
          node {
            children {
              edges {
                node {
                  id
                  slug
                  uri
                  ... on Page {
                    id
                    title
                  }
                }
              }
            }
            content
            featuredImage {
              node {
                altText
                caption
                id
                sizes
                sourceUrl
                srcSet
              }
            }
            id
            menuOrder
            modified
            page {
              excludeFromPathGeneration
            }
            parent {
              node {
                id
                slug
                uri
                ... on Page {
                  title
                }
              }
            }
            slug
            title
            uri
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const pages =
    data?.pages?.edges?.map(({ node }) => {
      const page = { ...node };

      if (page.featuredImage?.node) {
        page.featuredImage = page.featuredImage.node;
      }

      if (page.parent?.node) {
        page.parent = page.parent.node;
      }

      if (page.children?.edges) {
        page.children = page.children.edges.map(({ node: child }) => child);
      }

      return page;
    }) || [];

  return { pages };
}

export function getBreadcrumbsByUri(uri, pages = []) {
  if (!uri || uri === '/') return [];

  const segments = uri.split('/').filter(Boolean);
  const breadcrumbs = [];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}/`;
    const page = pages.find((p) => p.uri === currentPath);
    if (page) {
      breadcrumbs.push({
        title: page.title,
        uri: page.uri,
      });
    }
  });

  return breadcrumbs;
}
