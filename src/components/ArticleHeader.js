import React from 'react';

import ArticleMeta from 'components/ArticleMeta';

const ArticleHeader = ({title, category, date}) => {

    return (
        <header className="article-header">

            <h1 className="flat-top p-name" itemProp="headline">
                { title }
            </h1>

            <ArticleMeta category={category} date={date} />

        </header>
    );

};

export default ArticleHeader;