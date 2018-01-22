import React from 'react';
import Link from 'gatsby-link';

import BlogListPost from './blog-list-post';

const BlogList = ({posts}) => {

    if ( !Array.isArray(posts) ) return null;

    const blog_posts = posts.filter(post => post.node.frontmatter.template === 'post');

    return (
        <div className="blog-list">
            { blog_posts.map(({ node }, index) => <BlogListPost key={`BlogList-${index}`} excerpt={node.excerpt} content={node.frontmatter} />) }
        </div>
    )

}

export default BlogList;