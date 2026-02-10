import { fetchAPI } from 'lib/api';

export async function getAllPosts() {
  const query = `
    query AllPosts {
      posts(first: 1000) {
        edges {
          node {
            id
            title
            slug
            excerpt
            date
            modified
            featuredImage {
              node {
                altText
                caption
                sourceUrl
              }
            }
            author {
              node {
                name
                slug
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const posts =
    data?.posts?.edges?.map(({ node }) => {
      const post = { ...node };
      if (post.featuredImage?.node) {
        post.featuredImage = post.featuredImage.node;
      }
      if (post.author?.node) {
        post.author = post.author.node;
      }
      if (post.categories?.edges) {
        post.categories = post.categories.edges.map(({ node }) => node);
      }
      return post;
    }) || [];

  return { posts };
}

export async function getPostsCount() {
  const query = `
    query PostsCount {
      posts(first: 1000) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  return data?.posts?.edges?.length || 0;
}

export async function getPaginatedPosts(offset = 0, limit = 10) {
  const { posts: allPosts } = await getAllPosts();
  return allPosts.slice(offset, offset + limit);
}

export async function getRelatedPosts(category, postId, count = 5) {
  if (!category?.categoryId) {
    return [];
  }

  const query = `
    query RelatedPosts($categoryId: Int!, $limit: Int!) {
      posts(where: { categoryId: $categoryId }, first: $limit) {
        edges {
          node {
            postId
            title
            slug
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query, {
    categoryId: category.categoryId,
    limit: count + 1,
  });

  if (!data?.posts?.edges) {
    return [];
  }

  return data.posts.edges
    .map(({ node }) => {
      const post = { ...node };
      if (post.categories?.edges) {
        post.categories = post.categories.edges.map(({ node: cat }) => cat);
      }
      return post;
    })
    .filter((post) => post.postId !== postId)
    .slice(0, count)
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      categoryName: category.name,
      categorySlug: category.slug,
    }));
}

export async function getPostBySlug(slug) {
  const query = `
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
            }
          }
        }
        content
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        postId
        title
        slug
      }
    }
  `;

  const data = await fetchAPI(query, { slug });

  if (!data?.post) {
    return { post: undefined };
  }

  const post = { ...data.post };

  if (post.author?.node) {
    post.author = { ...post.author.node };
  }

  if (post.categories?.edges) {
    post.categories = post.categories.edges.map(({ node }) => node);
  }

  if (post.featuredImage?.node) {
    post.featuredImage = post.featuredImage.node;
  }

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    const seoQuery = `
      query PostSEOBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
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
      const seoData = await fetchAPI(seoQuery, { slug });
      if (seoData?.post?.seo) {
        const { seo = {} } = seoData.post;
        post.metaTitle = seo.title;
        post.metaDescription = seo.metaDesc;
        post.readingTime = seo.readingTime;
        post.canonical = seo.canonical;
        post.og = {
          author: seo.opengraphAuthor,
          description: seo.opengraphDescription,
          image: seo.opengraphImage,
          modifiedTime: seo.opengraphModifiedTime,
          publishedTime: seo.opengraphPublishedTime,
          publisher: seo.opengraphPublisher,
          title: seo.opengraphTitle,
          type: seo.opengraphType,
        };
        post.article = {
          author: post.og.author,
          modifiedTime: post.og.modifiedTime,
          publishedTime: post.og.publishedTime,
          publisher: post.og.publisher,
        };
        post.robots = {
          nofollow: seo.metaRobotsNofollow,
          noindex: seo.metaRobotsNoindex,
        };
        post.twitter = {
          description: seo.twitterDescription,
          image: seo.twitterImage,
          title: seo.twitterTitle,
        };
      }
    } catch (e) {
      console.log(`[posts][getPostBySlug] Failed to query SEO plugin: ${e.message}`);
    }
  }

  return { post };
}

export async function getPostsPerPage() {
  if (process.env.POSTS_PER_PAGE) {
    console.warn(
      'You are using the deprecated POST_PER_PAGE variable. Use your WordPress instance instead to set this value ("Settings" > "Reading" > "Blog pages show at most").',
    );
    return Number(process.env.POSTS_PER_PAGE);
  }

  const query = `
    query PostPerPage {
      allSettings {
        readingSettingsPostsPerPage
      }
    }
  `;

  const data = await fetchAPI(query);
  return Number(data?.allSettings?.readingSettingsPostsPerPage) || 10;
}

export async function getPostsByAuthorSlug(authorSlug) {
  const query = `
    query PostsByAuthor($slug: String!) {
      posts(where: { authorName: $slug }, first: 100) {
        edges {
          node {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                altText
                caption
                sourceUrl
              }
            }
            author {
              node {
                name
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query, { slug: authorSlug });
  const posts =
    data?.posts?.edges?.map(({ node }) => {
      const post = { ...node };
      if (post.featuredImage?.node) {
        post.featuredImage = post.featuredImage.node;
      }
      if (post.author?.node) {
        post.author = post.author.node;
      }
      if (post.categories?.edges) {
        post.categories = post.categories.edges.map(({ node }) => node);
      }
      return post;
    }) || [];

  return { posts };
}

export function postPathBySlug(slug, options = {}) {
  const { parent } = options;
  if (parent) {
    return `/${parent}/${slug}`;
  }
  return `/posts/${slug}`;
}
