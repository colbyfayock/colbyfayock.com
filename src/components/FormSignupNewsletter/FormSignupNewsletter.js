import ClassName from 'models/classname';

import Button from 'components/Button';

import styles from './FormSignupNewsletter.module.scss';

const FormSignupNewsletter = ({ className }) => {
  const formClassName = new ClassName(styles.formSignupNewsletter);

  formClassName.addIf(className, className);

  return (
    <form
      className={formClassName.toString()}
      action="https://app.convertkit.com/forms/1359772/subscriptions"
      method="post"
    >
      <input
        className={styles.formSignupNewsletterInput}
        name="email_address"
        placeholder="Your email address"
        required
        type="email"
      />
      <Button className={styles.formSignupNewsletterButton}>Subscribe</Button>
    </form>
  );
};

export default FormSignupNewsletter;
