import React from 'react';

import CategoriesList from 'components/categories-list';
import Time from 'components/time';

const ArticleMeta = ({category, date}) => {

  if ( !category && !date ) return null;

  const meta = [];

  if ( category ) {
    meta.push(<CategoriesList categories={category} />)
  };

  if ( date ) {
    meta.push(<Time date={date} />);
  }

  return (
    <ul className="article-meta">
      { meta.map((item, index) => <li key={`ArticleMeta-${index}`}>{ item }</li>)}
    </ul>
  );

};

export default ArticleMeta;