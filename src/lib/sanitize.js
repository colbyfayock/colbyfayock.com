const ALLOWED_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'br',
  'hr',
  'strong',
  'em',
  'u',
  's',
  'del',
  'ins',
  'ul',
  'ol',
  'li',
  'a',
  'blockquote',
  'pre',
  'code',
  'img',
  'figure',
  'figcaption',
  'div',
  'span',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
  'iframe',
];

const DANGEROUS_ATTR = [/on\w+=/i, /javascript:/i, /data:/i, /vbscript:/i];

function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') {
    return '';
  }

  let result = html;

  result = result.replace(/<!--[\s\S]*?-->/g, '');

  for (const pattern of DANGEROUS_ATTR) {
    result = result.replace(pattern, '');
  }

  result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  result = result.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  result = result.replace(/<embed\b[^>]*>/gi, '');
  result = result.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '');
  result = result.replace(/<input\b[^>]*>/gi, '');
  result = result.replace(/<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/gi, '');

  const allowedTagPattern = new RegExp(`<(\/?)(${ALLOWED_TAGS.join('|')})\b([^>]*)>`, 'gi');
  result = result.replace(allowedTagPattern, (match, slash, tag, attrs) => {
    let safeAttrs = '';
    if (attrs) {
      const attrPairs = attrs.match(/([\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/g);
      if (attrPairs) {
        for (const attr of attrPairs) {
          const attrMatch = attr.match(/^([\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/);
          if (attrMatch) {
            const [, name, val1, val2, val3] = attrMatch;
            const value = val1 || val2 || val3 || '';
            const lowerValue = value.toLowerCase();

            if (name === 'href' && !lowerValue.match(/^(https?:|mailto:|#)/)) {
              continue;
            }

            if (name === 'src' && !lowerValue.match(/^https?:|data:/)) {
              continue;
            }

            safeAttrs += ` ${name}="${value}"`;
          }
        }
      }
    }
    return `<${slash}${tag}${safeAttrs}>`;
  });

  result = result.replace(/<[^>]+>/g, (match) => {
    const tagMatch = match.match(/^<([\w-]+)/i);
    if (tagMatch) {
      const tag = tagMatch[1].toLowerCase();
      if (!ALLOWED_TAGS.includes(tag)) {
        return '';
      }
    }
    return match;
  });

  return result;
}

export function sanitizeExcerpt(excerpt) {
  if (!excerpt || typeof excerpt !== 'string') {
    throw new Error(`Failed to sanitize excerpt: invalid type ${typeof excerpt}`);
  }

  let sanitized = excerpt;

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, '&hellip;');
  sanitized = sanitized.replace('....', '.');
  sanitized = sanitized.replace('.&hellip;', '.');
  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, '');

  return sanitizeHtml(sanitized);
}

export { sanitizeHtml };
