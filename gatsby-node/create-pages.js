const path = require("path");

const hostname = 'https://www.colbyfayock.com';

module.exports = ({ graphql, actions }) => {

  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                template
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {

      if ( result.errors ) {
        return reject(result.errors);
      }

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`src/templates/${String(node.frontmatter.template)}.js`),
          context: {
            slug: node.fields.slug,
            permalink: createPermalinkFromSlug(node.fields.slug)
          },
        });
      });

      resolve();

    });
  });
};

function createPermalinkFromSlug(slug) {
  let path = slug;
  if ( path.charAt(0) !== '/' ) {
    path = `/${path}`;
  }
  if ( path.charAt(path.length - 1) !== '/' ) {
    path = `${path}/`;
  }
  return `${hostname}${path}`;
}