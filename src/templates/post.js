import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Parameterize from 'parameterize';

import Layout from '../components/layout';
import ArticleHeader from '../components/article/article-header';

const PostContent = ({html}) => {
    return (
        <section className="row cf" itemProp="articleBody">
            <div className="article-content-body" dangerouslySetInnerHTML={{ __html: html }}></div>
        </section>
    );
}

export default function Template({ location, data }) {

    const content = data.markdownRemark.frontmatter;
    const html = data.markdownRemark.html;

    const helmet_settings = {
        bodyAttributes: {
            class: `article post post-${Parameterize(content.title)}`,
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
        <Layout location={location}>
            <article className="container article-content" itemScope="" itemType="http://schema.org/BlogPosting">

                <Helmet {...helmet_settings} />

                <ArticleHeader title={content.title} categories={content.categories} date={content.date} />

                <PostContent html={html} />

            </article>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($path: String!) {
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