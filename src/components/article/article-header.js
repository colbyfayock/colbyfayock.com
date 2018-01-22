import React from 'react';

import ArticleMeta from './article-meta';

const ArticleHeader = ({title, categories, date}) => {

    return (
        <header class="article-header">

            <h1 class="flat-top" itemprop="headline">
                { title }
            </h1>

            <ArticleMeta categories={categories} date={date} />

        </header>
    );

};

export default ArticleHeader;