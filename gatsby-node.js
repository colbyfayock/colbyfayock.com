/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

const build_stages = [
    'develop',
    'develop-html',
    'build-html',
    'build-javascript'
];

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

exports.modifyWebpackConfig = ({config, stage}) => {

    if ( build_stages.includes(stage) ) {

        // Remove svg from url-loader config

        config.loader(`url-loader`, {
            test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
            loader: `url`,
            query: {
                limit: 10000,
                name: `static/[name].[hash:8].[ext]`,
            },
        });

        config.loader('svg-react-loader', {
            test: /\.svg$/,
            loader: 'svg-react-loader'
        });

    }

    return config;
}