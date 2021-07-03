import Link from 'next/link';

import { categoryPathBySlug } from 'lib/categories';
import { formatDate } from 'lib/datetime';
import ClassName from 'models/classname';

import styles from './Metadata.module.scss';

const Metadata = ({ className, date, categories }) => {
  const metadataClassName = new ClassName(styles.metadata);

  metadataClassName.addIf(className, className);

  return (
    <ul className={metadataClassName.toString()}>
      {Array.isArray(categories) && categories[0] && (
        <li className={styles.metadataCategories}>
          <ul>
            {categories.map((category) => {
              return (
                <li key={category.slug}>
                  <Link href={categoryPathBySlug(category.slug)}>
                    <a>{category.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      )}
      {date && (
        <li>
          <time pubdate="pubdate" dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      )}
    </ul>
  );
};

export default Metadata;
