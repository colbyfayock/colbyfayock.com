import clsx from 'clsx';

import styles from './Logo.module.scss';

const Logo = ({ className, title }) => {
  return (
    <span
      className={clsx(styles.logo, className)}
      dangerouslySetInnerHTML={{
        __html: title || '',
      }}
    />
  );
};

export default Logo;
