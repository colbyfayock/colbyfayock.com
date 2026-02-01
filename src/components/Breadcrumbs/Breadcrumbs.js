import Link from 'next/link';
import clsx from 'clsx';

import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = ({ className, breadcrumbs }) => {
  return (
    <ul className={clsx(styles.breadcrumbs, className)}>
      {breadcrumbs.map(({ id, title, uri }) => {
        return (
          <li key={id}>
            {!uri && title}
            {uri && <Link href={uri}>{title}</Link>}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
