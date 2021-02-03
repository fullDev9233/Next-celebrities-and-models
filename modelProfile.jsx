import React from 'react';
import { connect } from 'react-redux';

import { Header, Head, Footer, ModelProfile, ModelProfileContent } from '../src/components';
import { getModelProfile, clearModelProfile, getModelPosts } from '../src/store/model/actions';
import Loader from '../src/components/Loader';
import { pages } from '../src/utils/links';
import config from 'config';

import '../config.scss';

const ModelSearch = ({ idModel, profile, profiles, spinner }) => (
  <div>
    <Head
      title={config.env.getModelPageTitle(idModel)}
      description={`${config.env.siteName} photos and videos from ${idModel} - ${Object.keys(profile).length ? profile.counters.images : null} Photos, ${Object.keys(profile).length ? profile.counters.videos : null} Videos, ${Object.keys(profile).length ? profile.counters.posts_count : null} Posts.`}
    />
    {spinner ? (
      <div className="global_loader">
        <Loader />
      </div>
    ) : null }
    <div id="pw">
      <div className="fixedContent">
        <Header isModelPage={pages.modelProfile} currentStatus="search" />
      </div>
      <main className={profiles.length ? 'mainContent mainContent--withOut-modelSlider' : 'mainContent mainContent--withOut-modelSlider mainContentSmall'}>
        {!Object.keys(profile).length ? <Loader /> : (
          <div>
            <ModelProfile />
            <ModelProfileContent />
          </div>
        )}
      </main>
      <Footer currentStatus="search" />
    </div>
  </div>
);

ModelSearch.getInitialProps = async ({ store, query }) => {
  await store.dispatch(clearModelProfile());
  await store.dispatch(getModelProfile(query.id));
  await store.dispatch(getModelPosts());
  return { idModel: query.id };
};

const mapStateToProps = state => ({
  profile: state.modelData.profile,
  profiles: state.modelData.profiles,
  spinner: state.authData.spinner
});

export default connect(mapStateToProps)(ModelSearch);
