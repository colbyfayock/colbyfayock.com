import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from 'components/layout';
import EmailSignup from 'components/EmailSignup';

import websiteSocialCard from 'assets/images/website-social-card.jpg'

const NewsletterPage = ({location}) => {

  const helmet_settings = {
    bodyAttributes: {
      class: 'newsletter',
    },
    meta: [
      {
        name: 'image',
        content: websiteSocialCard
      },
      {
        property: 'og:url',
        content: `https://www.colbyfayock.com/newsletter`
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:image',
        content: websiteSocialCard
      },
      {
        property: 'og:image:secure_url',
        content: websiteSocialCard
      },
      {
        property: 'og:image:width',
        content: 1280
      },
      {
        property: 'og:image:height',
        content: 640
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:image',
        content: websiteSocialCard
      },
      {
        property: 'twitter:site',
        content: '@colbyfayock'
      },
      {
        property: 'twitter:creator',
        content: '@colbyfayock'
      }
  ],
  };

  return (
    <Layout location={location}>

      <article className="container article-content" itemScope="" itemType="http://schema.org/BlogPosting">

        <Helmet {...helmet_settings} />

        <header className="article-header">

            <h1 className="entry-title single-title flat-top" itemProp="headline">
              Newsletter
            </h1>

        </header>

        <div className="content">
          <div className="row">
            <p>
              Sign up to get content updates straight to your inbox! 🔥
            </p>
            <div className="do">
              <div className="do-will">
                <h3>✅ 💁‍♂️ What I will do...</h3>
                <ul>
                  <li>Sometimes send you links to my content</li>
                  <li>Like articles, <a href="https://youtube.com/colbyfayock">Youtube</a>, and <a href="https://egghead.io/instructors/colby-fayock?af=atzgap">Egghead</a></li>
                  <li>Say nice things about the awesome stuff others are making</li>
                  <li>Thank you too much for your support</li>
                </ul>
              </div>
              <div className="do-wont">
                <h3>🚫 🙅‍♂️ What I won't do...</h3>
                <ul>
                  <li>Sell or give away your info</li>
                  <li>Spam you</li>
                  <li>Say anything mean</li>
                  <li>Let you down</li>
                </ul>
              </div>
            </div>
            <p>
              <EmailSignup />
            </p>
            <p className="newsletter-note">
              After signing up, you'll get an email to confirm your subscription.
              Make sure to do this or you won't get awesome stuff!
            </p>
          </div>
        </div>

      </article>

    </Layout>
  );

}

export default NewsletterPage;