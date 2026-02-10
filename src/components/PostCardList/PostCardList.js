import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import clsx from 'clsx';

import PostCard from 'components/PostCard';

import styles from './PostCardList.module.scss';

const PostCardList = ({ className, posts, labelPlural = 'Posts', url, postCardOptions }) => {
  return (
    <div className={clsx(styles.postCardList, className)}>
      <ul className={styles.postCardListPosts}>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <PostCard className={styles.postCardListPostCard} post={post} {...postCardOptions} />
            </li>
          );
        })}
      </ul>

      {url && (
        <p className={styles.postCardListMore}>
          <Link href={url}>
            View All {labelPlural} <FaChevronRight />
          </Link>
        </p>
      )}
    </div>
  );
};

export default PostCardList;
