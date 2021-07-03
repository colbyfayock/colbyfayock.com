import Link from 'next/link';

import ClassName from 'models/classname';
import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';

import Metadata from 'components/Metadata';

import styles from './PostCard.module.scss';

const PostCard = ({ className, post, parentSlug, contentField = 'excerpt', linkField = 'slug' }) => {
  const postCardClassName = new ClassName(styles.postCard);

  postCardClassName.addIf(className, className);

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
    <div className={postCardClassName}>
      <Link href={link}>
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
