import RSS from 'rss';

import { getSiteMetadata } from 'lib/site';
import { getAllPosts, postPathBySlug } from 'lib/posts';

const MAX_POSTS = 100;

export const dynamic = 'force-dynamic';

export async function GET() {
  const metadata = await getSiteMetadata();
  const { posts } = await getAllPosts({ queryIncludes: 'all' });

  const feed = new RSS({
    title: metadata.title || '',
    description: metadata.description,
    site_url: metadata.url,
    feed_url: `${metadata.url}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${metadata.title}`,
    language: metadata.language,
    pubDate: new Date(),
  });

  posts.slice(0, MAX_POSTS).map((post) => {
    feed.item({
      title: post.title,
      guid: `${metadata.url}${postPathBySlug(post.slug)}`,
      url: `${metadata.url}${postPathBySlug(post.slug)}`,
      date: post.date,
      description: post.excerpt,
      author: post.author.name,
      categories: post.categories.map(({ name }) => name) || [],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
