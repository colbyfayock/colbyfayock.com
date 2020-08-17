import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import ArticleExcerpt from './ArticleExcerpt';

const DEFAULT_COUNT = 5;

const ArticleList = ({ articles = [], count = DEFAULT_COUNT, toAll, labelArticles = 'Posts'}) => {
  const showAll = count >= articles.length || count === 'all';

  // Only slice up the amount of posts to the current count if we're not showing all

  if ( !showAll ) {
    articles = articles.slice(0, count + 1);
  }


  return (
    <div className="article-list">
      { Array.isArray(articles) && articles.map((article, index) => {
        return (
          <ArticleExcerpt key={`ArticleListPost-${index}`} article={article} />
        );
      })}

      {!showAll && toAll && (
        <div className="article-list-more">
          <a href={toAll}>
            View All {labelArticles} <FaChevronRight />
          </a>
        </div>
      )}
    </div>
  )
}

export default ArticleList;