import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

import ClassName from 'models/classname';

import PostCard from 'components/PostCard';

import styles from './PostCardList.module.scss';

const PostCardList = ({ className, posts, labelPlural = 'Posts', url, postCardOptions }) => {
  const postCardListClassName = new ClassName(styles.postCardList);

  postCardListClassName.addIf(className, className);

  return (
    <div className={postCardListClassName}>
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
            <a>
              View All {labelPlural} <FaChevronRight />
            </a>
          </Link>
        </p>
      )}
    </div>
  );
};

export default PostCardList;
