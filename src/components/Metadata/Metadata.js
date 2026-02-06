import Link from 'next/link';
import clsx from 'clsx';

import { categoryPathBySlug } from 'lib/wordpress';
import { formatDate } from 'lib/datetime';

import styles from './Metadata.module.scss';

const Metadata = ({ className, date, categories }) => {
  return (
    <ul className={clsx(styles.metadata, className)}>
      {Array.isArray(categories) && categories[0] && (
        <li className={styles.metadataCategories}>
          <ul>
            {categories.map((category) => {
              return (
                <li key={category.slug}>
                  <Link href={categoryPathBySlug(category.slug)}>{category.name}</Link>
                </li>
              );
            })}
          </ul>
        </li>
      )}
      {date && (
        <li>
          <time itemProp="datePublished" dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      )}
    </ul>
  );
};

export default Metadata;
