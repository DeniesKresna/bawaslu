/**
 *
 * BarcodePage
 *
 */

import React, { useEffect, useState, memo, useCallback } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import BarcodeScanner from '../../components/BarcodeScanner';

import Grid from '@material-ui/core/Grid';

export function BarcodePage({  }) {
  //useInjectReducer({ key: 'barcodePage', reducer });
  //useInjectSaga({ key: 'barcodePage', saga });
  const entity = "Barcode";

  const [scanning, setScanning] = useState(false);

  const handleScan = data => {
    setScanning(!scanning)
  }

  const handleDetected = res => {
    //setResult(res);
    //alert(res);
    console.log(res);
  }

  return (
    <div>
      <Helmet>
        <title>{entity}</title>
        <meta name="description" content="Halaman Barcode" />
      </Helmet>
      <h1>{entity}</h1>
      <Grid>
        <BarcodeScanner />
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
