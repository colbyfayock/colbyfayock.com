import React from 'react';

const ArticleContent = ({children, html}) => {
  return (
    <section className="article-content row cf" itemProp="articleBody">
      <div className="article-content-body" dangerouslySetInnerHTML={{ __html: html }}></div>
      <div className="article-content-extra">{ children }</div>
    </section>
  );
}

export default ArticleContent;