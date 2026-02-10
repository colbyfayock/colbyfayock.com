import clsx from 'clsx';

import Container from 'components/Container';

import styles from './Header.module.scss';

const Header = ({ children, className, containerClassName, ...rest }) => {
  return (
    <header className={clsx(styles.header, className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </header>
  );
};

export default Header;
