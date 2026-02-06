import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getPostBySlug, getRelatedPosts, categoryPathBySlug, postPathBySlug } from 'lib/wordpress';
import { getSiteMetadata } from 'lib/site';
import { sanitizeHtml } from 'lib/sanitize';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';

import styles from 'styles/pages/Post.module.scss';

export const revalidate = 60;
export const dynamicParams = true;

// Skip static generation to avoid API rate limits during build
// Pages will be generated on-demand with ISR
export async function generateStaticParams() {
  return [];
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);
  const metadata = await getSiteMetadata();

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const { title, metaTitle, description, excerpt, featuredImage, slug: postSlug } = post;
  const socialImage = featuredImage?.sourceUrl;

  return {
    title: metaTitle || title,
    description: description || excerpt,
    openGraph: {
      url: `${metadata.url}/posts/${postSlug}`,
      images: socialImage
        ? [
            {
              url: socialImage,
              width: 2000,
              height: 1000,
            },
          ]
        : [],
    },
    alternates: {
      canonical: `/posts/${postSlug}`,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, content, date, author, categories, modified, featuredImage } = post;
  const metadata = await getSiteMetadata();

  const socialImage = featuredImage?.sourceUrl;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${metadata.url}/posts/${slug}`,
    },
    headline: title,
    image: [socialImage || `${metadata.url}/images/og/default.png`],
    datePublished: date ? new Date(date).toISOString() : '',
    dateModified: modified ? new Date(modified).toISOString() : date ? new Date(date).toISOString() : '',
    description: post.excerpt,
    keywords: categories?.map(({ name }) => name).join(', ') || '',
    copyrightYear: date ? new Date(date).getFullYear() : '',
    author: {
      '@type': 'Person',
      name: author?.name,
    },
    publisher: {
      '@type': 'Organization',
      name: metadata.title,
      logo: {
        '@type': 'ImageObject',
        url: `${metadata.url}/favicon.ico`,
      },
    },
  };

  const { categories: postCategories, postId } = post;
  const category = postCategories?.length ? postCategories[0] : null;
  const relatedPosts = await getRelatedPosts(category, postId);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Layout metadata={metadata}>
        <Header>
          {featuredImage && (
            <FeaturedImage
              {...featuredImage}
              src={featuredImage.sourceUrl}
              dangerouslySetInnerHTML={featuredImage.caption}
            />
          )}
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          <Metadata className={styles.postMetadata} date={date} author={author} categories={categories} />
        </Header>

        <Content>
          <Section>
            <Container>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(content),
                }}
              />
            </Container>
          </Section>
        </Content>

        <Section className={styles.postFooter}>
          <Container>
            <p className={styles.postModified}>Last updated on {formatDate(modified)}.</p>
            {!!relatedPosts.length && (
              <div className={styles.relatedPosts}>
                {relatedPosts[0]?.categoryName ? (
                  <span>
                    More from{' '}
                    <Link href={categoryPathBySlug(relatedPosts[0].categorySlug)}>{relatedPosts[0].categoryName}</Link>
                  </span>
                ) : (
                  <span>More Posts</span>
                )}
                <ul>
                  {relatedPosts.map((relatedPost) => (
                    <li key={relatedPost.title}>
                      <Link href={postPathBySlug(relatedPost.slug)}>{relatedPost.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </Section>
      </Layout>
    </>
  );
}
