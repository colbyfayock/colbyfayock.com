import clsx from 'clsx';

import Image from 'components/Image';

import styles from './FeaturedImage.module.scss';

const FeaturedImage = ({ className, ...rest }) => {
  delete rest.srcSet;
  delete rest.sizes;

  return <Image className={clsx(styles.featuredImage, className)} {...rest} />;
};

export default FeaturedImage;
