import Document, { Head, Main, NextScript } from 'next/document';
import { Fragment } from 'react';
import config from '../src/config';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Check if in production
    const isProduction = process.env.NODE_ENV === 'production';
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, isProduction };
  }

  setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.gaTrackingId}');
      `
    };
  }

  render() {
    const { isProduction } = this.props;
    const GMT_LIB_URL = `https://www.googletagmanager.com/gtag/js?id=${config.gaTrackingId}`;
    return (
      <html>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          {isProduction && (
            <Fragment>
              <script
                async
                src={GMT_LIB_URL}
              />
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
