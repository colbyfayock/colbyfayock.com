import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { FaRss } from 'react-icons/fa';

import { usePosts, useTalks, useProjects } from 'hooks';

import Layout from 'components/Layout';
import Masthead from 'components/Masthead';
import ArticleList from 'components/ArticleList';


const Index = ({location, data}) => {

  const { posts, toAll: toAllPosts } = usePosts();
  const { projects, toAll: toAllProjects } = useProjects();
  const { talks, toAll: toAllTalks } = useTalks();

  const helmet_settings = {
    bodyAttributes: {
      class: 'home',
    },
    meta: [
      {
        property: 'og:type',
        content: 'profile'
      },
      {
        property: 'profile:first_name',
        content: 'Colby'
      },
      {
        property: 'profile:username',
        content: 'colbyfayock'
      }
    ],
  };

  return (
    <Layout location={location}>
      <Helmet {...helmet_settings} />

      <Masthead />

      <div className="home-newsletter">
        <div className="container">
          <Link to="/newsletter">
            <span className="home-newsletter-icon">
              📬
            </span>
            <div className="home-newsletter-content">
              <h3>Weekly Newsletter</h3>
              <p>
                Fresh guides & tutorials weekly straight to your inbox!
              </p>
            </div>
            <div className="home-newsletter-button">
              <button>
                Sign Up
              </button>
            </div>
          </Link>
        </div>
      </div>

      <div className="home-content container">

        <div className="home-main">
          <div className="home-content-header">
            <Link className="home-content-header-title" to={toAllPosts}>
              <h2>
                <span className="header-icon">📝</span> Latest From the Blog
              </h2>
            </Link>
            <div className="home-content-header-actions">
              <a href="https://www.colbyfayock.com/rss.xml">
                <FaRss className="icon-rss" /> RSS
              </a>
            </div>
          </div>
          <ArticleList articles={posts} count={5} toAll={toAllPosts} labelArticles="Posts" />
        </div>

        <div className="home-sidebar">

          <div className="home-sidebar-section">
            <div className="home-content-header">
              <Link className="home-content-header-title" to={toAllProjects}>
                <h2>
                  <span className="header-icon">💼</span> Featured Projects
                </h2>
              </Link>
            </div>
            <ArticleList articles={projects} count={5} toAll={toAllProjects} labelArticles="Projects"  />
          </div>

          <div className="home-sidebar-section">
            <div className="home-content-header">
              <Link className="home-content-header-title" to={toAllTalks}>
                <h2>
                  <span className="header-icon">📣</span> Recent Talks
                </h2>
              </Link>
            </div>
            <ArticleList articles={talks} count={3} toAll={toAllTalks} labelArticles="Talks"  />
          </div>

        </div>

      </div>

    </Layout>
  );

}

export default Index;