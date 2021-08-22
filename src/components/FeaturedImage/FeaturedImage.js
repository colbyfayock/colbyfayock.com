import ClassName from 'models/classname';

import Image from 'components/Image';

import styles from './FeaturedImage.module.scss';

const FeaturedImage = ({ className, ...rest }) => {
  const featuredImageClassName = new ClassName(styles.featuredImage);

  featuredImageClassName.addIf(className, className);

  // temporarily remove srcset and sizes to avoid bug with incorrect sizing
  delete rest.srcSet;
  delete rest.sizes;

  return <Image className={featuredImageClassName} {...rest} />;
};

export default FeaturedImage;
