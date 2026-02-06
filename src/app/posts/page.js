import { getPostsCount, getPaginatedPosts, getPostsPerPage } from 'lib/posts';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCardList from 'components/PostCardList';
import Pagination from 'components/Pagination';

export const revalidate = 60;

export async function generateMetadata() {
  const metadata = await getSiteMetadata();

  return {
    title: `All Posts - ${metadata.title}`,
    description: 'Browse all posts and articles.',
    openGraph: {
      url: `${metadata.url}/posts`,
    },
    alternates: {
      canonical: `/posts`,
    },
  };
}

export default async function PostsPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const postsPerPage = await getPostsPerPage();
  const offset = postsPerPage * (page - 1);
  const posts = await getPaginatedPosts(offset, postsPerPage);
  const postsCount = await getPostsCount();
  const pagesCount = Math.ceil(postsCount / postsPerPage);
  const metadata = await getSiteMetadata();

  return (
    <Layout metadata={metadata}>
      <Section>
        <Container>
          <h1>All Posts</h1>
          <PostCardList posts={posts} labelPlural="Posts" />
          <Pagination pagesCount={pagesCount} currentPage={page} basePath="/posts" addCanonical={false} />
        </Container>
      </Section>
    </Layout>
  );
}
