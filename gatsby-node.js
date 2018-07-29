/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

exports.createPages = ({ actions, graphql }) => {

    const { createPage } = actions;

    return graphql(`
        {
            allMarkdownRemark(
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            template
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
                component: path.resolve(`src/templates/${String(node.frontmatter.template)}.js`)
            });
        });

    });

};

// exports.onCreateWebpackConfig = ({stage, actions}) => {

//     const build_stages = [
//         'develop',
//         'develop-html',
//         'build-html',
//         'build-javascript'
//     ];

//     if ( build_stages.includes(stage) ) {

//         actions.setWebpackConfig({

//             module: {
//                 rules: [

//                     {
//                         test: /\.svg$/,
//                         loader: 'svg-react-loader'
//                     },

//                     // Remove svg from url-loader config

//                     {
//                         test: /\.(jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
//                         loader: 'url',
//                         query: {
//                             limit: 10000,
//                             name: `static/[name].[hash:8].[ext]`,
//                         },
//                     }

//                 ]
//             }
//         });

//     }

// };