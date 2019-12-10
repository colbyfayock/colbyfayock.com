import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Parameterize from 'parameterize';
import { FaPlay, FaThLarge } from 'react-icons/fa';

import Talk from 'models/talk';

import Layout from 'components/layout';
import ArticleHeader from 'components/ArticleHeader';
import ArticleContent from 'components/ArticleContent';

export default function Template({ location, data }) {

  const talk = new Talk(data.markdownRemark);
  const { title, html, date, video, slides } = talk;
  const links = [];

  if ( video ) {
    links.push({
      id: 'videos',
      to: video,
      label: 'Video',
      icon: <FaPlay />
    });
  }

  if ( slides ) {
    links.push({
      id: 'slides',
      to: slides,
      label: 'Slides',
      icon: <FaThLarge />
    });
  }

  const helmet_settings = {
    bodyAttributes: {
      class: `article talk talk-${Parameterize(title)}`,
    },
    title: `${title} - Colby Fayock`,
    meta: [
      {
        property: 'og:title',
        content: `${title} - Colby Fayock`,
      },
    ],
  };

  return (
    <Layout location={location}>
      <article className="container article-content" itemScope="" itemType="http://schema.org/BlogPosting">

        <Helmet {...helmet_settings} />

        <ArticleHeader title={title} date={date} />

        <ArticleContent html={html}>
          { video && (
            <p className="article-content-video">
              <iframe width="560" height="315" src={video} title={title} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </p>
          )}
        </ArticleContent>

        {links.length > 0 && (
          <div className="article-links">
            <ul>
              {links.map(({to, label, icon, id} = {}) => {
                return (
                  <li className={`article-links-${id}`}>
                    <a href={to}>
                      { icon }
                      { label }
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        video
        slides
      }
      fields {
        slug
      }
    }
  }
`;