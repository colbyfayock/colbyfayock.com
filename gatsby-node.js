/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {

    const { createPage } = boundActionCreators;

    return graphql(`
        {
            allMarkdownRemark(
                sort: {
                    order: DESC,
                    fields: [frontmatter___date]
                }
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `).then(result => {

        if ( result.errors ) {
           return Promise.reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: node.frontmatter.path,
                component: path.resolve('src/templates/blog-post.js'),
            });
        });

    });
};