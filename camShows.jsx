import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';

import { Header, Footer, ShowList, Loader } from '../src/components';
import { links } from '../src/utils/links';
import config from 'config';

import '../config.scss';

const CamShows = ({ profiles, spinner }) => (
  <div>
    <Head>
      <title>{config.env.getCamShowsPageTitle()}</title>
      <meta charSet="UTF-8" />
      <meta name="description" content="Live video stream of top celebrities and models. Unlock private photos, videos, and messages from top celebrities and models." />
      <meta name="format-detection" content="telephone=no" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="shortcut icon" href={links.vixyIco} type="image/x-icon" />
    </Head>
    {spinner ? (
      <div className="global_loader">
        <Loader />
      </div>
    ) : null }
    <div id="pw">
      <div className="fixedContent">
        <Header currentStatus="show" />
      </div>
      <main className={profiles.length ? 'mainContent mainContent--withOut-modelSlider' : 'mainContent mainContent--withOut-modelSlider mainContentSmall'}>
        <ShowList />
      </main>
      <Footer currentStatus="show" />
    </div>
  </div>
);

const mapStateToProps = state => ({
  profiles: state.modelData.profiles,
  spinner: state.authData.spinner
});

export default connect(mapStateToProps)(CamShows);
