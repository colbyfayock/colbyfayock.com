import React from "react";
import Helmet from 'react-helmet';

import ArticleHeader from '../components/article/article-header';

const PostContent = ({html}) => {
    return (
        <section className="row cf" itemprop="articleBody">
            <div className="article-content-body" dangerouslySetInnerHTML={{ __html: html }}></div>
        </section>
    );
}

const Post = ({content, html}) => {

    const helmet_settings = {
        bodyAttributes: {
            class: 'article post',
        },
        title: `${content.title} - Colby Fayock`,
        meta: [
            {
                name: 'description',
                content: 'A UX Designer &amp; Front-end Developer Blog'
            }
        ],
    };

    return (
        <article className="container article-content" role="article" itemscope="" itemtype="http://schema.org/BlogPosting">

            <Helmet {...helmet_settings} />

            <ArticleHeader title={content.title} categories={content.categories} date={content.date} />

            <PostContent html={html} />

        </article>
    );

}

export default function Template({ data }) {
    return <Post content={data.markdownRemark.frontmatter} html={data.markdownRemark.html} />;
}

export const pageQuery = graphql`
    query PostByPath($path: String!) {
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