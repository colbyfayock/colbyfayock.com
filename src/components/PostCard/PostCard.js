import Link from 'next/link';

import ClassName from 'models/classname';
import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';

import styles from './PostCard.module.scss';

const PostCard = ({ className, post, parentSlug, options = {} }) => {
  const postCardClassName = new ClassName(styles.postCard);

  postCardClassName.addIf(className, className);

  const { title, excerpt, slug, date, categories } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('date') && date) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories') && categories) {
    metadata.categories = categories;
  }

  const hasMetadata = Object.keys(metadata).length > 0;

  return (
    <div className={postCardClassName}>
      <Link href={postPathBySlug(slug, { parent: parentSlug })}>
        <a>
          <h3
            className={styles.postCardTitle}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </a>
      </Link>

      {hasMetadata && <Metadata className={styles.postCardMetadata} {...metadata} />}

      {excerpt && (
        <div
          className={styles.postCardContent}
          dangerouslySetInnerHTML={{
            __html: sanitizeExcerpt(excerpt),
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
