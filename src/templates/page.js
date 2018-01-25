import React from 'react';
import Helmet from 'react-helmet';
import Parameterize from 'parameterize';

import ArticleHeader from '../components/article/article-header';
import ArticleMeta from '../components/article/article-meta';

const PageContent = ({html}) => {
    return (
        <section className="row cf" itemprop="articleBody">
            <div className="article-content-body" dangerouslySetInnerHTML={{ __html: html }}></div>
        </section>
    );
}

const Page = ({content, html}) => {

    const helmet_settings = {
        bodyAttributes: {
            class: `article page page-${Parameterize(content.title)}`,
        },
        title: `${content.title} - Colby Fayock`,
        meta: [
            {
                property: 'og:title',
                content: `${content.title} - Colby Fayock`,
            },
        ],
    };

    return (
        <article className="container article-content" role="article" itemscope="" itemtype="http://schema.org/BlogPosting">

            <Helmet {...helmet_settings} />

            <header className="article-header">

                <h1 className="entry-title single-title flat-top" itemprop="headline">
                    { content.title }
                </h1>

                <ArticleMeta categories={content.categories} date={content.date} />

            </header>

            <PageContent html={html} />

        </article>
    );

}

export default function Template({ data }) {
    return <Page content={data.markdownRemark.frontmatter} html={data.markdownRemark.html} />;
}

export const pageQuery = graphql`
    query PageByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                categories
                date(formatString: "MMMM DD, YYYY")
                title
            }
        }
    }
`;