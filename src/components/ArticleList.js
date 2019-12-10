import React, { useState } from 'react';
import { FaHandPointDown, FaThumbsUp } from 'react-icons/fa';

import ArticleExcerpt from './ArticleExcerpt';

const DEFAULT_COUNT = 5;

const ArticleList = ({ articles = [], count: articles_count = DEFAULT_COUNT}) => {
  const [count, setCount] = useState(articles_count);
  const show_all = count >= articles.length || count === 'all';

  // Only slice up the amount of posts to the current count if we're not showing all

  if ( !show_all ) {
    articles = articles.slice(0, count + 1);
  }

  /**
   * handleLoadMore
   */

  function handleLoadMore(e) {
    e.preventDefault();
    setCount(count + count);
  }

  return (
    <div className="article-list">
      { Array.isArray(articles) && articles.map((article, index) => {
        return (
          <ArticleExcerpt key={`ArticleListPost-${index}`} article={article} />
        );
      })}
      {!show_all && (
        <div className="article-list-more text-center">
          <a href="/all-posts" onClick={handleLoadMore}>
            More Posts, Please...
            <span className="fa-hand-o-down">
              <FaHandPointDown />
            </span>
            <span className="fa-thumbs-o-up">
              <FaThumbsUp />
            </span>
          </a>
        </div>
      )}
    </div>
  )
}

export default ArticleList;