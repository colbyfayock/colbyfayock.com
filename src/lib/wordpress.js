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

export async function getAllPostSlugs() {
  const query = `
    query AllPostSlugs {
      posts(first: 1000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  return data?.posts?.edges?.map(({ node }) => node.slug) || [];
}

export async function getAllPosts() {
  const query = `
    query AllPosts {
      posts(first: 100) {
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

export async function getAllFeaturedFeatures() {
  const query = `
    query AllFeaturedFeatures {
      featuredFeatures(first: 100) {
        edges {
          node {
            id
            title
            slug
            content
          }
        }
      }
    }
  `;

  try {
    const data = await fetchAPI(query);
    const featuredFeatures =
      data?.featuredFeatures?.edges?.map(({ node }) => {
        const feature = {
          id: node.id,
          title: node.title,
          slug: node.slug,
          content: node.content,
        };
        return feature;
      }) || [];

    return { featuredFeatures };
  } catch (e) {
    console.log(`[wordpress][getAllFeaturedFeatures] Failed to fetch: ${e.message}`);
    return { featuredFeatures: [] };
  }
}

export async function getPostsCount() {
  const query = `
    query PostsCount {
      posts {
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
  // WordPress GraphQL uses cursor-based pagination
  // For simplicity, we fetch all posts and slice
  // In production, you'd want to implement proper cursor pagination
  const { posts: allPosts } = await getAllPosts();
  return allPosts.slice(offset, offset + limit);
}

export async function getRelatedPosts(category, postId, count = 4) {
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
      console.log(`[wordpress][getPageByUri] Failed to query SEO plugin: ${e.message}`);
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

export async function getAllEventNotes() {
  const query = `
    query AllEventNotes {
      eventNotes(first: 100) {
        edges {
          node {
            id
            slug
            title
            uri
            content
            date
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const eventNotes =
    data?.eventNotes?.edges?.map(({ node }) => {
      const eventNote = {
        ...node,
      };
      if (eventNote.featuredImage?.node) {
        eventNote.featuredImage = eventNote.featuredImage.node;
      }
      return eventNote;
    }) || [];

  return { eventNotes };
}

export async function getAllUsers() {
  const query = `
    query AllUsers {
      users(first: 1000) {
        edges {
          node {
            id
            name
            slug
            description
            avatar {
              url
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const users =
    data?.users?.edges?.map(({ node }) => {
      const user = { ...node };
      if (user.avatar?.url) {
        user.avatar.url = user.avatar.url.replace('http://', 'https://');
      }
      return user;
    }) || [];

  return { users };
}

export async function getUserByNameSlug(slug) {
  const { users } = await getAllUsers();
  const user = users.find((user) => user.slug === slug);
  return { user };
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

export function postPathBySlug(slug) {
  return `/posts/${slug}`;
}

export function categoryPathBySlug(slug) {
  return `/categories/${slug}`;
}

export async function getAllProjects() {
  const query = `
    query AllProjects {
      projects(first: 100) {
        edges {
          node {
            id
            title
            slug
            content
            date
            featuredImage {
              node {
                altText
                caption
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const projects =
    data?.projects?.edges?.map(({ node }) => {
      const project = { ...node };
      if (project.featuredImage?.node) {
        project.featuredImage = project.featuredImage.node;
      }
      return project;
    }) || [];

  return { projects };
}

export async function getAllPodcasts() {
  const query = `
    query AllPodcasts {
      podcasts(first: 100) {
        edges {
          node {
            id
            title
            slug
            date
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const podcasts =
    data?.podcasts?.edges?.map(({ node }) => {
      const podcast = { ...node };
      if (podcast.featuredImage?.node) {
        podcast.featuredImage = podcast.featuredImage.node;
      }
      return podcast;
    }) || [];

  return { podcasts };
}

export async function getPodcastBySlug(slug) {
  const query = `
    query PodcastBySlug($slug: ID!) {
      podcast(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        date
        featuredImage {
          node {
            altText
            sourceUrl
            caption
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query, { slug });

  if (!data?.podcast) {
    return { podcast: undefined };
  }

  const podcast = { ...data.podcast };
  if (podcast.featuredImage?.node) {
    podcast.featuredImage = podcast.featuredImage.node;
  }

  return { podcast };
}

export async function getAllCategories() {
  const query = `
    query AllCategories {
      categories(first: 100) {
        edges {
          node {
            id
            databaseId
            name
            slug
            count
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const categories =
    data?.categories?.edges?.map(({ node }) => ({
      id: node.id,
      categoryId: node.databaseId,
      name: node.name,
      slug: node.slug,
      count: node.count,
    })) || [];

  return { categories };
}

export async function getCategoryBySlug(slug) {
  const { categories } = await getAllCategories();
  const category = categories.find((c) => c.slug === slug);
  return { category };
}

export async function getPostsByCategoryId(categoryId) {
  const query = `
    query PostsByCategory($id: Int!) {
      posts(where: { categoryId: $id }, first: 100) {
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

  const data = await fetchAPI(query, { id: categoryId });
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

export async function getEventNoteBySlug(slug) {
  const query = `
    query EventNoteBySlug($slug: ID!) {
      eventNote(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        date
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query, { slug });

  if (!data?.eventNote) {
    return { eventNote: undefined };
  }

  const eventNote = {
    ...data.eventNote,
  };

  return { eventNote };
}
