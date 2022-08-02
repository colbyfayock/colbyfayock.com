import { getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export default function Category({ category, posts }) {
  const { name, description } = category;

  const { metadata } = usePageMetadata({
    metadata: {
      ...category,
      description: description || category.og?.description || `Read ${posts.length} posts from ${name}`,
    },
  });

  return <TemplateArchive title={name} Title={<Title title={name} />} posts={posts} slug="posts" metadata={metadata} />;
}

export async function getStaticProps({ params = {} } = {}) {
  const { category } = await getCategoryBySlug(params?.slug);

  if (!category) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { posts } = await getPostsByCategoryId(category.categoryId);

  return {
    props: {
      category,
      posts,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
