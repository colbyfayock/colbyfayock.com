import React from 'react';

const EmailSignup = ({}) => {
  return (
    <form className="email-signup" action="https://app.convertkit.com/forms/1359772/subscriptions" method="post">
      <input name="email_address" placeholder="Your email address" required="" type="email" />
      <button className="button button-primary">
        Subscribe
      </button>
    </form>
  )
};

export default EmailSignup;