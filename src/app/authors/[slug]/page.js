import { notFound } from 'next/navigation';

import { getUserByNameSlug } from 'lib/users';
import { getPostsByAuthorSlug } from 'lib/posts';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { user } = await getUserByNameSlug(resolvedParams.slug);
  const { posts } = await getPostsByAuthorSlug(user?.slug);

  if (!user) {
    return {
      title: 'Author Not Found',
    };
  }

  const authorDescription = user.description || `Read ${posts?.length || 0} posts from ${user.name}`;

  return {
    title: user.name,
    description: authorDescription,
    openGraph: {
      title: user.name,
      description: authorDescription,
      url: `/authors/${resolvedParams.slug}`,
    },
    twitter: {
      title: user.name,
      description: authorDescription,
    },
    alternates: {
      canonical: `/authors/${resolvedParams.slug}`,
    },
  };
}

export default async function AuthorPage({ params }) {
  const resolvedParams = await params;
  const { user } = await getUserByNameSlug(resolvedParams.slug);
  const { posts } = await getPostsByAuthorSlug(user?.slug);

  if (!user) {
    notFound();
  }

  const { title, name, avatar, description, slug } = user;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: name,
    description: description,
    publisher: {
      '@type': 'ProfilePage',
      name: title,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TemplateArchive
        title={name}
        Title={<Title title={name} thumbnail={avatar} />}
        posts={posts}
        slug={slug}
        metadata={{
          title: name,
          description: description || `Read ${posts.length} posts from ${name}`,
        }}
      />
    </>
  );
}
