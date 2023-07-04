import { Helmet } from 'react-helmet';

import PageNewsletter from './newsletter';

export default function Page(props) {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <PageNewsletter {...props} />
    </>
  );
}

export { getStaticProps } from './newsletter';
