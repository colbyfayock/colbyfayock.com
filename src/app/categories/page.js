import Link from 'next/link';

import { getAllCategories, categoryPathBySlug } from 'lib/categories';
import { getSiteMetadata } from 'lib/site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';

import styles from 'styles/pages/Categories.module.scss';

export const revalidate = 60;

export async function generateMetadata() {
  const metadata = await getSiteMetadata();
  return {
    title: 'Categories',
    description: `Read categories at ${metadata.title}`,
  };
}

export default async function CategoriesPage() {
  const { categories } = await getAllCategories();
  const metadata = await getSiteMetadata();
  const { title: siteTitle } = metadata;
  const title = 'Categories';
  const slug = 'categories';
  const metaDescription = `Read ${categories.length} categories at ${siteTitle}.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: metaDescription,
    url: `${metadata.url}/${slug}`,
    publisher: {
      '@type': 'ProfilePage',
      name: metadata.title,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Layout metadata={metadata}>
        <Header>
          <Container>
            <h1>Categories</h1>
          </Container>
        </Header>

        <Section>
          <Container>
            <SectionTitle>All Categories</SectionTitle>
            <ul className={styles.categories}>
              {categories.map((category) => {
                return (
                  <li key={category.slug}>
                    <Link href={categoryPathBySlug(category.slug)}>{category.name}</Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>
      </Layout>
    </>
  );
}
