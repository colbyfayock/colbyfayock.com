import { Component } from 'react';

import Link from 'next/link';

import styles from 'styles/components/ErrorBoundary.module.scss';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Component stack:', errorInfo.componentStack);

    if (process.env.NODE_ENV === 'production') {
      if (typeof window !== 'undefined' && window.Sentry) {
        window.Sentry.captureException(error, {
          extra: errorInfo,
        });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <h1>Something went wrong</h1>
          <p>We apologize for the inconvenience. Please try again later.</p>
          <div className={styles.errorDetails}>
            <details>
              <summary>Error details</summary>
              <pre>{this.state.error?.message || 'Unknown error'}</pre>
            </details>
          </div>
          <Link href="/" className={styles.homeLink}>
            Return to homepage
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
