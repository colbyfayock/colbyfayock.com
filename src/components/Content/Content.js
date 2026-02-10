import clsx from 'clsx';

import styles from './Content.module.scss';

const Content = ({ children, className }) => {
  return <div className={clsx(styles.content, className)}>{children}</div>;
};

export default Content;
