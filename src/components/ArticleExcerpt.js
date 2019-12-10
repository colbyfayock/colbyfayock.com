import React from 'react';
import { Link } from 'gatsby';

import ArticleMeta from 'components/ArticleMeta';
import { FaHandPointRight, FaThumbsUp } from 'react-icons/fa';

const ArticleExcerpt = ({article = {}}) => {

  const { path, title, excerpt, date, category } = article

  return (
    <article className="article-excerpt">

      <header className="article-excerpt-header">

        <h2 className="h2 article-excerpt-header-title">
          <Link to={ path }>
            { title }
          </Link>
        </h2>

        <ArticleMeta category={category} date={date} />

      </header>

      <section>

        <p dangerouslySetInnerHTML={{ __html: excerpt }} />

        <p className="article-excerpt-more">
          <Link to={ path }>
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

export default ArticleExcerpt;