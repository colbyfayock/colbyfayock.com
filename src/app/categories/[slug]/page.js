import { notFound } from 'next/navigation';

import { getCategoryBySlug, getPostsByCategoryId } from 'lib/categories';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { category } = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: category.name,
    description: category.description || `Posts from ${category.name}`,
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const { category } = await getCategoryBySlug(resolvedParams.slug);
  const { posts } = await getPostsByCategoryId(category?.categoryId);

  if (!category) {
    notFound();
  }

  const { name, description } = category;

  return (
    <TemplateArchive
      title={name}
      Title={<Title title={name} />}
      posts={posts}
      slug="posts"
      metadata={{
        title: name,
        description: description || `Read ${posts.length} posts from ${name}`,
      }}
    />
  );
}
