import React from 'react';
import { connect } from 'react-redux';

import { Header, Footer, Head, ModelListSlider, SearchLine, ModelSearchResult, Loader } from '../src/components';
import { getProfiles } from '../src/store/search/actions';
import config from 'config';

import '../config.scss';

const ModelSearch = ({ profiles, spinner }) => (
  <div>
    <Head
      title={config.env.getDiscoverPageTitle()}
      description={`Discover ${config.env.siteName}'s newest and most active celebrities and model. Interact LIVE with top celebrities and models, and access their private pictures, videos and more.`}
    />
    {spinner ? (
      <div className="global_loader">
        <Loader />
      </div>
    ) : null }
    <div id="pw">
      <div className="fixedContent">
        <Header currentStatus="search" />
        <ModelListSlider />
      </div>
      <main className={profiles.length ? 'mainContent' : 'mainContent mainContentSmall'}>
        <SearchLine />
        <ModelSearchResult />
      </main>
      <Footer currentStatus="search" />
    </div>
  </div>
);

ModelSearch.getInitialProps = ({ store }) => {
  store.dispatch(getProfiles());
  return {};
};

const mapStateToProps = state => ({
  profiles: state.modelData.profiles,
  spinner: state.authData.spinner
});

export default connect(mapStateToProps)(ModelSearch);
