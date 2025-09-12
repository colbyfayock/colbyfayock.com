import ClassName from 'models/classname';

import Button from 'components/Button';

import styles from './FormSignupNewsletter.module.scss';

const FormSignupNewsletter = ({ className, location }) => {
  const formClassName = new ClassName(styles.formSignupNewsletter);

  formClassName.addIf(className, className);

  return (
    <form
      className={formClassName.toString()}
      method="POST"
      action="https://mailtik.spacejelly.dev/api/forms/newsletter"
    >
      <input
        type="text"
        autoComplete="off"
        tabIndex={-1}
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '0',
          height: '0',
          border: '0',
          padding: '0',
          margin: '0',
          overflow: 'hidden',
        }}
        name="phone"
      />
      <input type="hidden" name="redirect" value="https://colbyfayock.com/" />
      <input type="hidden" name="tags" value={`location:colbyfayock.com,location:colbyfayock.com-${location}`} />
      <input
        className={styles.formSignupNewsletterInput}
        type="email"
        name="email"
        required
        placeholder="Your email address"
      />
      <Button className={styles.formSignupNewsletterButton}>Subscribe</Button>
    </form>
  );
};

export default FormSignupNewsletter;
