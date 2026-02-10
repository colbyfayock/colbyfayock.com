import clsx from 'clsx';

import styles from './Container.module.scss';

const Container = ({ children, className, ...rest }) => {
  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
