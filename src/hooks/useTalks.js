import Talk from 'models/talk';
import { templateTypeFromNode } from 'lib/nodes';
import { useNodes } from './';

export default function useTalks() {
  const nodes = useNodes();

  // Filter down to only the talks

  const talks = nodes.filter(({ node = {} } = {}) => {
    return templateTypeFromNode(node) === 'talk';
  });

  // Map through all talks and create a new Talk instance for each

  return talks.map(({ node } = {}) => new Talk(node));
}