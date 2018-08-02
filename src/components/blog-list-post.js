import React from 'react';
import { Link } from 'gatsby';

import ArticleMeta from '../components/article/article-meta';
import { FaHandPointRight, FaThumbsUp } from 'react-icons/fa';

const BlogListPost = ({post}) => {

    if ( !post ) return null;

    return (
        <article className="blog-list-post">

            <header className="blog-list-post-header">

                <h2 className="h2 blog-list-post-header-title">
                    <Link to={ post.path }>
                        { post.title }
                    </Link>
                </h2>

                <ArticleMeta category={post.category} date={post.date} />

            </header>

            <section>

                <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />

                <p className="blog-list-post-more">
                    <Link to={ post.path }>
                        Read More
                        <span className="fa-hand-o-right">
                            <FaHandPointRight />
                        </span>
                        <span className="fa-thumbs-o-up">
                            <FaThumbsUp />
                        </span>
                    </Link>
                </p>

            </section>

        </article>
    )

}

export default BlogListPost;