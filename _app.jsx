import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import { Router } from '../src/routes';
import { makeStore } from '../src/store/store';
import { trackPageView } from '../src/utils/utility';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  componentDidMount() {
    const htmlRoot = document.documentElement;
    htmlRoot.setAttribute('lang', 'en');
    // Send route change to google analytics
    Router.onRouteChangeComplete = (url) => {
      trackPageView(url);
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(withReduxSaga({ async: true })(MyApp));
