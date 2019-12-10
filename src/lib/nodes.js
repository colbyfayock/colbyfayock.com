/**
 * templateTypeFromNode
 */

export function templateTypeFromNode(node) {
  const { frontmatter = {} } = node;
  const { template } = frontmatter;
  return template;
}