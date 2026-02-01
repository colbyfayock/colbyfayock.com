import useSite from 'hooks/use-site';
import clsx from 'clsx';

import styles from './Logo.module.scss';

const Logo = ({ className }) => {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  return (
    <span
      className={clsx(styles.logo, className)}
      dangerouslySetInnerHTML={{
        __html: title,
      }}
    />
  );
};

export default Logo;
