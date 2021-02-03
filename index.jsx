import React from 'react';
import { connect } from 'react-redux';

import { Header, Head, Footer, ModelListSlider, ModelCardList, Loader } from '../src/components';
import { getPosts } from '../src/store/model/actions';
import config from 'config';

import '../config.scss';

const HomePage = ({ profiles, spinner }) => (
  <div>
    <Head
      title={config.env.getHomePageTitle()}
      description={`Browse and access recent posts on ${config.env.siteName}. Unlock private photos, videos, and messages from top celebrities and models.`}
    />
    {spinner ? (
      <div className="global_loader">
        <Loader />
      </div>
    ) : null }
    <div id="pw">
      <div className="fixedContent">
        <Header currentStatus="main" />
        <ModelListSlider />
      </div>
      <main className={profiles.length ? 'mainContent' : 'mainContent mainContentSmall'}>
        <ModelCardList />
      </main>
      <Footer currentStatus="main" />
    </div>
  </div>
);

HomePage.getInitialProps = ({ store }) => {
  store.dispatch(getPosts());
  return {};
};

const mapStateToProps = state => ({
  profiles: state.modelData.profiles,
  spinner: state.authData.spinner
});

export default connect(mapStateToProps)(HomePage);
