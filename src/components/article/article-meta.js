import React from 'react';

import CategoriesList from '../categories-list';
import Time from '../time';

const ArticleMeta = ({category, date}) => {

    if ( !category && !date ) return null;

    const meta = [
        <CategoriesList categories={category} />,
        <Time date={date} />,
    ];

    return (
        <ul className="article-meta">
            { meta.map((item, index) => <li key={`ArticleMeta-${index}`}>{ item }</li>)}
        </ul>
    );

};

export default ArticleMeta;