'use client';

import { WebpageJsonLd } from 'lib/json-ld';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination/Pagination';

import styles from 'styles/templates/Archive.module.scss';

const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive({
  pageClassName,
  title = 'Archive',
  label = 'Posts',
  Title,
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug,
  metadata,
  pagination,
}) {
  const { metadata: siteMetadata = {} } = useSite();

  const pageMetadata = {
    ...metadata,
    title: metadata.title || title,
    description: metadata.description || `Read ${label.toLowerCase()} at ${siteMetadata.title}`,
  };

  return (
    <Layout pageClassName={pageClassName} metadata={siteMetadata}>
      <WebpageJsonLd
        title={pageMetadata.title}
        description={pageMetadata.description}
        siteTitle={siteMetadata.title}
        slug={slug}
      />

      <Header>
        <Container>
          <h1>{Title || title}</h1>
          {pageMetadata.description && (
            <p
              className={styles.archiveDescription}
              dangerouslySetInnerHTML={{
                __html: pageMetadata.description,
              }}
            />
          )}
        </Container>
      </Header>

      <Section>
        <Container>
          <SectionTitle>{label}</SectionTitle>
          {Array.isArray(posts) && (
            <>
              <ul className={styles.posts}>
                {posts.map((post) => {
                  return (
                    <li key={post.slug}>
                      <PostCard post={post} parentSlug={slug} {...postOptions} />
                    </li>
                  );
                })}
              </ul>
              {pagination && (
                <Pagination
                  currentPage={pagination?.currentPage}
                  pagesCount={pagination?.pagesCount}
                  basePath={pagination?.basePath}
                />
              )}
            </>
          )}
        </Container>
      </Section>
    </Layout>
  );
}
