export const QUERY_ALL_MENUS = `
  {
    menus {
      edges {
        node {
          id,
          menuId,
          menuItems {
            edges {
              node {
                cssClasses,
                id,
                parentId,
                label,
                title,
                target,
                path
              }
            }
          },
          name,
          slug,
          locations
        }
      }
    }
  }
`;
