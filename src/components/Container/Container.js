import ClassName from 'models/classname';

import styles from './Container.module.scss';

const Container = ({ children, className, ...rest }) => {
  const containerClassName = new ClassName(styles.container);

  containerClassName.addIf(className, className);

  return (
    <div className={containerClassName.toString()} {...rest}>
      {children}
    </div>
  );
};

export default Container;
