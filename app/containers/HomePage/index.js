/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import { makeSelectUser } from '../LoginPage/selectors';
import reducer from './reducer';
import saga from './saga';
import loginReducer from '../LoginPage/reducer';
import loginSaga from '../LoginPage/saga';

export function HomePage({user}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  useInjectReducer({ key: 'loginPage', reducer: loginReducer });
  useInjectSaga({ key: 'loginPage', saga: loginSaga });
  return (
    <div>
      <Helmet>
        <title>Beranda</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <h1>Selamat Datang {user.name}</h1>
      <p>Aplikasi ini digunakan untuk pengaturan Inventaris Bawaslu Riau. Anda dapat mempelajari aplikasi ini dengan cara:</p>
      <ul>
        <li>Mendownload Guide book di halaman help Desk</li>
        <li>Menanyakan pada administrator tentang cara penggunaannya</li>
      </ul>
      <p>Jika anda berkenan, silakan isi kuesioner kami di halaman Help Desk untuk membantu kami memperbaiki sistem dengan lebih baik</p>
      <p>Salam hangat.</p>
    </div>
  );
}

HomePage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
