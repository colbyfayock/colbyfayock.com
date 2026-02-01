import Link from 'next/link';
import clsx from 'clsx';
import { postPathBySlug } from 'lib/posts';
import { sanitizeExcerpt } from 'lib/sanitize';

import Metadata from 'components/Metadata';

import styles from './PostCard.module.scss';

const PostCard = ({ className, post, parentSlug, contentField = 'excerpt', linkField = 'slug' }) => {
  const { title, slug, date, categories } = post;

  const metadata = {};

  if (date) {
    metadata.date = date;
  }

  if (categories) {
    metadata.categories = categories;
  }

  const hasMetadata = Object.keys(metadata).length > 0;

  const link = linkField === 'slug' ? postPathBySlug(slug, { parent: parentSlug }) : post[linkField];

  return (
    <div className={clsx(styles.postCard, className)}>
      <Link href={link}>
        <h3
          className={styles.postCardTitle}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      </Link>

      {hasMetadata && <Metadata className={styles.postCardMetadata} {...metadata} />}

      {post[contentField] && (
        <div
          className={styles.postCardContent}
          dangerouslySetInnerHTML={{
            __html: sanitizeExcerpt(post[contentField]),
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
