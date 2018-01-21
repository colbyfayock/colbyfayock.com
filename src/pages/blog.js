import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';

class BlogIndex extends React.Component {

    render() {

        const siteTitle = this.props.data.site.siteMetadata.title;
        const posts = this.props.data.allMarkdownRemark.edges || [];

        return (
            <div>
                {posts.map(({ node, index }) => {
                    const title = get(node, 'frontmatter.title')
                    return (
                        <div key={index}>
                            <h3>
                                <Link style={{ boxShadow: 'none' }} to={node.frontmatter.path}>
                                    {title}
                                </Link>
                            </h3>
                            <small>{node.frontmatter.date}</small>
                            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default BlogIndex;

export const pageQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: {
                fields: [frontmatter___date],
                order: DESC
            }
        )
        {
            edges {
                node {
                    excerpt
                    frontmatter {
                        path
                        date(formatString: "DD MMMM, YYYY")
                        title
                    }
                }
            }
        }
    }
`;