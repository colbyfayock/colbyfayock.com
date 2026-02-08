import { getPostsPerPage, getPaginatedPosts, getPostsCount } from 'lib/posts';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCardList from 'components/PostCardList';
import Pagination from 'components/Pagination';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { page } = await params;
  const metadata = await getSiteMetadata();

  return {
    title: `Posts - Page ${page}`,
    description: `Browse posts on page ${page}.`,
    openGraph: {
      url: `${metadata.url}/posts/page/${page}`,
    },
    alternates: {
      canonical: `/posts/page/${page}`,
    },
  };
}

export default async function PostsPagePage({ params }) {
  const { page } = await params;
  const pageNum = parseInt(page);
  const postsPerPage = await getPostsPerPage();
  const offset = postsPerPage * (pageNum - 1);
  const posts = await getPaginatedPosts(offset, postsPerPage);
  const postsCount = await getPostsCount();
  const pagesCount = Math.ceil(postsCount / postsPerPage);
  const metadata = await getSiteMetadata();

  return (
    <Layout metadata={metadata}>
      <Section>
        <Container>
          <h1>Posts - Page {page}</h1>
          <PostCardList posts={posts} labelPlural="Posts" />
          <Pagination pagesCount={pagesCount} currentPage={pageNum} basePath="/posts" addCanonical={false} />
        </Container>
      </Section>
    </Layout>
  );
}
