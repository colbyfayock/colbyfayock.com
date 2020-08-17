import Post from 'models/post';
import { templateTypeFromNode } from 'lib/nodes';
import { useNodes } from './';

export default function usePosts() {
  const nodes = useNodes();

  // Filter down to only the posts

  const posts = nodes.filter(({ node = {} } = {}) => {
    return templateTypeFromNode(node) === 'post';
  });

  // Map through all posts and create a new Post instance for each

  return {
    posts: posts.map(({ node } = {}) => new Post(node)),
    toAll: '/all-posts'
  }
}