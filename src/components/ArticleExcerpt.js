import React from 'react';
import { Link } from 'gatsby';

import ArticleMeta from 'components/ArticleMeta';
import { FaHandPointRight, FaThumbsUp } from 'react-icons/fa';

const ArticleExcerpt = ({article = {}}) => {

  const { path, title, excerpt, date, category } = article

  return (
    <article className="article-excerpt">

      <header className="article-excerpt-header">

        <h3 className="h3 article-excerpt-header-title">
          <Link to={ path }>
            { title }
          </Link>
        </h3>

        <ArticleMeta category={category} date={date} />

      </header>

      {excerpt && (
        <section>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
        </section>
      )}

    </article>
  )

}

export default ArticleExcerpt;