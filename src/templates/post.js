import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Parameterize from 'parameterize';

import Post from 'models/post';

import Layout from 'components/layout';
import ArticleHeader from 'components/ArticleHeader';
import Hidden from 'components/Hidden';

const PostContent = ({html}) => {
    return (
        <section className="row cf" itemProp="articleBody">
            <div className="article-content-body e-content" dangerouslySetInnerHTML={{ __html: html }}></div>
        </section>
    );
}

export default function Template({ location, data }) {

    const post = new Post(data.markdownRemark);

    const helmet_settings = {
        bodyAttributes: {
            class: `article post post-${Parameterize(post.title)}`,
        },
        title: `${post.title} - Colby Fayock`,
        meta: [
            {
                property: 'og:title',
                content: `${post.title} - Colby Fayock`,
            },
        ],
    };

    return (
        <Layout location={location}>
            <article className="container article-content h-entry" itemScope="" itemType="http://schema.org/BlogPosting">

                <Helmet {...helmet_settings} />

                <ArticleHeader title={post.title} category={post.category} date={post.date} />

                <PostContent html={post.html} />

                <Hidden className="p-summary e-content">
                    { post.excerpt }
                </Hidden>

                <Hidden>
                    <a class="p-author h-card" href="https://colbyfayock.com">Colby Fayock</a>
                    <img class="u-photo" src="https://www.colbyfayock.com/colby-fayock-bite-world.jpg" alt="Colby Fayock Image" />
                </Hidden>

                <Hidden>
                    <a class="u-url" href={`https://colbyfayock.com${post.path}`}>
                        { `https://colbyfayock.com${post.path}` }
                    </a>
                </Hidden>

            </article>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            excerpt
            frontmatter {
                category
                date(formatString: "MMMM DD, YYYY")
                title
            }
            fields {
                slug
            }
        }
    }
`;