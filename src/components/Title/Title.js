import clsx from 'clsx';

import styles from './Title.module.scss';

const Title = ({ className, title, thumbnail }) => {
  return (
    <div className={clsx(styles.title, className)}>
      {thumbnail && <img src={thumbnail.url} alt="" aria-hidden="true" />}
      <span>{title}</span>
    </div>
  );
};

export default Title;
