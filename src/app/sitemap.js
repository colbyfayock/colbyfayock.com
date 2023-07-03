import { getSiteMetadata } from 'lib/site';
import { getAllPages, pagePathBySlug } from 'lib/pages';
import { getAllPosts, postPathBySlug } from 'lib/posts';

export default async function sitemap() {
  const metadata = await getSiteMetadata();
  const { pages: allPages } = await getAllPages();
  const { posts: allPosts } = await getAllPosts();

  const pages = allPages.map(({ modified, slug }) => {
    return {
      url: `${metadata.url}${pagePathBySlug(slug)}`,
      lastModified: modified,
    };
  });

  const posts = allPosts.map(({ modified, slug }) => {
    return {
      url: `${metadata.url}${postPathBySlug(slug)}`,
      lastModified: modified,
    };
  });

  return [
    {
      url: metadata.url,
      lastModified: new Date(),
    },
    ...pages,
    ...posts,
  ];
}
