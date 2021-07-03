import useSite from 'hooks/use-site';

import ClassName from 'models/classname';

import styles from './Logo.module.scss';

const Logo = ({ className }) => {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  let logoClassName = new ClassName(styles.logo);

  logoClassName.addIf(className, className);

  return (
    <span
      className={logoClassName}
      dangerouslySetInnerHTML={{
        __html: title,
      }}
    />
  );
};

export default Logo;
