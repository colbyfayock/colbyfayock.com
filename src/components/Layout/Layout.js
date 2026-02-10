import Nav from 'components/Nav';
import Main from 'components/Main';
import Footer from 'components/Footer';

import styles from './Layout.module.scss';

const Layout = ({ children, exclude = [], pageClassName, metadata }) => {
  const layoutClassName = pageClassName ? `${styles.layoutContainer} ${pageClassName}` : styles.layoutContainer;

  return (
    <div className={layoutClassName}>
      {!exclude.includes('nav') && <Nav />}

      <Main>{children}</Main>

      <Footer metadata={metadata} />
    </div>
  );
};

export default Layout;
