const path = require("path");
const Parameterize = require("parameterize");

module.exports = ({ node, getNode, actions }) => {

  const { createNodeField } = actions

  if ( node.internal.type === 'MarkdownRemark' ) {
  createNodeField({
    node,
    name: 'slug',
    value: getNodeSlug(node),
  })
  }

};

function getNodeSlug({ frontmatter = {} } = {}) {

  let date;
  let year;
  let month;

  if ( frontmatter.template === 'post' ) {

    date = new Date(frontmatter.date);
    year = String(date.getFullYear());
    month = String(date.getMonth() + 1);

    if ( month.length === 1 ) {
      month = `0${month}`;
    }

    return `/${year}/${month}/${Parameterize(frontmatter.title)}`;

  }

  return Parameterize(frontmatter.title);

}