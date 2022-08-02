import { getPaginatedPosts } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts, pagination }) {
  const title = `All Posts`;
  const slug = 'posts';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: `Page ${pagination.currentPage}`,
    },
  });

  return <TemplateArchive title={title} posts={posts} slug={slug} pagination={pagination} metadata={metadata} />;
}

export async function getStaticProps({ params = {} } = {}) {
  const { posts, pagination } = await getPaginatedPosts({
    currentPage: params?.page,
    queryIncludes: 'archive',
  });

  if (!pagination.currentPage) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
