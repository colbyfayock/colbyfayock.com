import { fetchAPI } from 'lib/api';

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
