import { useState } from 'react';
import ClassName from 'models/classname';

import Button from 'components/Button';

import styles from './FormSignupNewsletter.module.scss';

const FormSignupNewsletter = ({ className, location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formClassName = new ClassName(styles.formSignupNewsletter);

  formClassName.addIf(className, className);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const formAction = e.target.action;

    try {
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      const result = await response.json();

      if (result.success) {
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
        }
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      <form
        className={formClassName.toString()}
        method="POST"
        action="https://mailtik.spacejelly.dev/api/forms/newsletter"
        onSubmit={handleSubmit}
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
          disabled={isLoading}
        />
        <Button className={styles.formSignupNewsletterButton} isLoading={isLoading}>
          Subscribe
        </Button>
      </form>
    </>
  );
};

export default FormSignupNewsletter;
