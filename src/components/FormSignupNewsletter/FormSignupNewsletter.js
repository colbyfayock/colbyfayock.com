import Button from 'components/Button';

import styles from './FormSignupNewsletter.module.scss';

const FormSignupNewsletter = () => {
  return (
    <form className={styles.form} action="https://app.convertkit.com/forms/1359772/subscriptions" method="post">
      <input name="email_address" placeholder="Your email address" required="" type="email" />
      <Button>Subscribe</Button>
    </form>
  );
};

export default FormSignupNewsletter;
