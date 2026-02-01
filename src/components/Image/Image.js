import clsx from 'clsx';

import styles from './Image.module.scss';

const Image = ({
  children,
  className,
  width = '100%',
  height = 'auto',
  src,
  alt,
  srcSet,
  sizes,
  dangerouslySetInnerHTML,
}) => {
  return (
    <figure className={clsx(styles.image, className)}>
      <div className={styles.featuredImageImg}>
        <img width={width} height={height} src={src} alt={alt || ''} srcSet={srcSet} sizes={sizes} />
      </div>
      {children && <figcaption>{children}</figcaption>}
      {dangerouslySetInnerHTML && (
        <figcaption
          dangerouslySetInnerHTML={{
            __html: dangerouslySetInnerHTML,
          }}
        />
      )}
    </figure>
  );
};

export default Image;
