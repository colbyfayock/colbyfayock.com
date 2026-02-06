import { fetchAPI } from 'lib/api';

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

export function categoryPathBySlug(slug) {
  return `/categories/${slug}`;
}
