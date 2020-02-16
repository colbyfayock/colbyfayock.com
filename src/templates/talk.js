import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Parameterize from 'parameterize';
import { FaPlay, FaThLarge, FaLink } from 'react-icons/fa';

import Talk from 'models/talk';

import Layout from 'components/layout';
import ArticleHeader from 'components/ArticleHeader';
import ArticleContent from 'components/ArticleContent';

export default function Template({ location, data }) {

  const talk = new Talk(data.markdownRemark);
  const { title, html, date, video, video_embed, slides, link, link_label } = talk;
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

  if ( link ) {
    links.push({
      id: 'link',
      to: link,
      label: link_label || 'Learn More',
      icon: <FaLink />
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
          { video_embed && (
            <p className="article-content-video">
              <iframe width="560" height="315" src={video_embed} title={title} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} />
            </p>
          )}
        </ArticleContent>

        {links.length > 0 && (
          <div className="article-links">
            <ul>
              {links.map(({to, label, icon, id} = {}, index) => {
                return (
                  <li key={`ArticleLink-${index}`} className={`article-links-${id}`}>
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
        video_embed
        slides
      }
      fields {
        slug
      }
    }
  }
`;