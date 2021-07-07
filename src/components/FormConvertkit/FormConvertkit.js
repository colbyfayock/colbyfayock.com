import ClassName from 'models/classname';

import Button from 'components/Button';

import styles from './FormConvertkit.module.scss';

const FormConvertkit = ({ className, formId }) => {
  const formClassName = new ClassName(styles.formConvertkit);

  formClassName.addIf(className, className);

  return (
    <form
      className={formClassName.toString()}
      action={`https://app.convertkit.com/forms/${formId}/subscriptions`}
      method="post"
    >
      <input
        className={styles.formConvertkitInput}
        name="email_address"
        placeholder="Your email address"
        required
        type="email"
      />
      <Button className={styles.formConvertkitButton}>Subscribe</Button>
    </form>
  );
};

export default FormConvertkit;
