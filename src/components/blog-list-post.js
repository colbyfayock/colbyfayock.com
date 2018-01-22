import React from 'react';
import Link from 'gatsby-link';

import FaHandORight from 'react-icons/lib/fa/hand-o-right';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

const BlogListPostCategories = ({categories}) => {

    if ( typeof categories !== 'string' ) return null;

    return categories.split(',').map((category, index) => {
        return (
            <span key={`BlogListPostCategories-${index}`}>
                { category.trim() }
            </span>
        )
    })

}

const BlogListPost = ({node}) => {

    if ( !node || !node.frontmatter ) return null;

    return (
        <article className="blog-list-post" role="article">

            <header className="blog-list-post-header">

                <h2 className="h2 blog-list-post-header-title">
                    <Link to={ node.frontmatter.path }>
                        { node.frontmatter.title }
                    </Link>
                </h2>

                <ul className="blog-list-post-meta">
                    <li className="blog-list-post-meta-categories">
                        <BlogListPostCategories categories={node.frontmatter.categories} />
                    </li>
                    <li>
                        <time className="updated">
                            { node.frontmatter.date }
                        </time>
                    </li>
                </ul>

            </header>

            <section>

                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />

                <p className="blog-list-post-more">
                    <Link to={ node.frontmatter.path }>
                        Read More
                        <span className="fa-hand-o-right">
                            <FaHandORight />
                        </span>
                        <span className="fa-thumbs-o-up">
                            <FaThumbsOUp />
                        </span>
                    </Link>
                </p>

            </section>

        </article>
    )

}

export default BlogListPost;