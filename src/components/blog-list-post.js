import React from 'react';
import { Link } from 'gatsby';

import ArticleMeta from '../components/article/article-meta';

import FaHandORight from 'react-icons/lib/fa/hand-o-right';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

const BlogListPost = ({excerpt, content}) => {

    if ( !excerpt || !content ) return null;

    return (
        <article className="blog-list-post">

            <header className="blog-list-post-header">

                <h2 className="h2 blog-list-post-header-title">
                    <Link to={ content.path }>
                        { content.title }
                    </Link>
                </h2>

                <ArticleMeta categories={content.categories} date={content.date} />

            </header>

            <section>

                <p dangerouslySetInnerHTML={{ __html: excerpt }} />

                <p className="blog-list-post-more">
                    <Link to={ content.path }>
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