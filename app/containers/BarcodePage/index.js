/**
 *
 * BarcodePage
 *
 */

import React, { useEffect, useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _, { debounce } from 'lodash';
import FormBuilder from "@jeremyling/react-material-ui-form-builder";

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectData, makeSelectSearch } from './selectors';
import { changeSearch, changeData, changeRow, getData, deleteRow } from './actions';
import reducer from './reducer';
import saga from './saga';
import Scanner from "react-webcam-qr-scanner";

import Grid from '@material-ui/core/Grid';

export function BarcodePage({  }) {
  //useInjectReducer({ key: 'barcodePage', reducer });
  //useInjectSaga({ key: 'barcodePage', saga });
  const entity = "Barcode";

  useEffect(() => {
  }, []);

  const handleDecode = (result) => {
    console.log(result);
    alert(result)
  } 

  const handleScannerLoad = (mode) => {
    console.log(mode);
  }

  return (
    <div>
      <Helmet>
        <title>{entity}</title>
        <meta name="description" content="Halaman Barcode" />
      </Helmet>
      <h1>{entity}</h1>
      <Grid container>
        <Grid item>
          <Scanner 
            className="some-classname"
            onDecode={handleDecode}
            onScannerLoad={handleScannerLoad}
            constraints={{ 
              audio: false, 
              video: { 
                facingMode: "environment" 
              } 
            }}
            captureSize={{ width: 1280, height: 720 }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

BarcodePage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BarcodePage);
