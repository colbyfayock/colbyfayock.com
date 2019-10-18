import React from 'react';

import ArticleMeta from './article-meta';

const ArticleHeader = ({title, category, date}) => {

    return (
        <header className="article-header">

            <h1 className="flat-top" itemProp="headline">
                { title }
            </h1>

            <ArticleMeta category={category} date={date} />

        </header>
    );

};

export default ArticleHeader;