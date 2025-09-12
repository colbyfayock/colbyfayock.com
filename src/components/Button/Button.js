import styles from './Button.module.scss';

const Button = ({ children, className, isLoading, ...rest }) => {
  let buttonClassName = styles.button;

  if (className) {
    buttonClassName = `${buttonClassName} ${className}`;
  }

  if (isLoading) {
    buttonClassName = `${buttonClassName} ${styles.loading}`;
  }

  return (
    <button {...rest} className={buttonClassName} disabled={isLoading}>
      <span className={styles.buttonText} style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </span>
      {isLoading && <div className={styles.spinner}></div>}
    </button>
  );
};

export default Button;
