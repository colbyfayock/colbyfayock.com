import React from 'react';
import Link from 'gatsby-link';

import BlogListPost from './blog-list-post';

const BlogList = ({data}) => {

    if ( !data || !data.allMarkdownRemark || !Array.isArray(data.allMarkdownRemark.edges) ) return null;

    const posts = data.allMarkdownRemark.edges;

    return (
        <div className="blog-list">
            { posts.map(({ node }, index) => <BlogListPost key={`BlogList-${index}`} node={node} />) }
        </div>
    )

}

export default BlogList;