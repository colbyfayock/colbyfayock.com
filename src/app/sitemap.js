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
      lastModified: new Date(modified).toISOString(),
    };
  });

  const posts = allPosts.map(({ modified, slug }) => {
    return {
      url: `${metadata.url}${postPathBySlug(slug)}`,
      lastModified: new Date(modified).toISOString(),
    };
  });

  return [
    {
      url: metadata.url,
      lastModified: new Date().toISOString(),
    },
    ...pages,
    ...posts,
  ];
}
