import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';

import { GA_TRACKING_ID } from '../lib/gtag';

// Via https://github.com/vercel/next.js/blob/canary/examples/with-react-helmet/pages/_document.js

export default class MyDocument extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args);
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.renderStatic() };
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map((el) => this.props.helmet[el].toComponent());
  }

  render() {
    return (
      <Html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetHeadComponents}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var script = document.createElement("script");
                script.src = "https://app.krunchdata.io/assets/js/k2.js";
                script.dataset.api = "https://api.krunchdata.io/traffic/web/record";
                script.dataset.id = "2UMPzzRooNRwoAuk4yuHtxTGitfJpzBW4G+jTmxq9VfPkkMbH8W1/Uelnza5XmEU";
                script.defer = true;
                script.type = "module";

                document.head.appendChild(script);
              `,
            }}
          />
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
