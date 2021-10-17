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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectData } from './selectors';
import { getData } from './actions';
import reducer from './reducer';
import saga from './saga';

import BarcodeScanner from '../../components/BarcodeScanner/index';
import InventoryDetailDialogPage from '../InventoryPage/InventoryDetailDialogPage';
import Button from '@material-ui/core/Button'
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

import Grid from '@material-ui/core/Grid';

export function BarcodePage({ data, onGetData }) {
  useInjectReducer({ key: 'barcodePage', reducer });
  useInjectSaga({ key: 'barcodePage', saga });
  const entity = "Barcode";

  const [dialogStatus, setDialogStatus] = useState(false);
  const [showScan, setShowScan] = useState(false);

  const handleDetected = res => {
    const resString = String(res)
    if(resString.includes("-")){
      const splitRes = resString.split("-")
      onGetData({code:splitRes[0], nup:splitRes[1]})
      setDialogStatus(true)
    }else{
      alert("ini bukan barcode SAMAWA")
    }
  }

  const handleCloseDialog = () => {
    setDialogStatus(false)
    setShowScan(false)
  }


  const handleToggleScan = () => {
    setShowScan(!showScan)
}

  return (
    <div>
      <Helmet>
        <title>{entity}</title>
        <meta name="description" content="Halaman Barcode" />
      </Helmet>
      <h1>{entity}</h1>
      <Grid>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AspectRatioIcon />}
            onClick={handleToggleScan}
          >
            Scan Barcode
          </Button>
        {showScan && <BarcodeScanner onHandleDetected={handleDetected} />}
      </Grid>

      { data != null && <InventoryDetailDialogPage id={data.ID} onHandleCloseDialog={handleCloseDialog} dialogStatus={dialogStatus} />
            }
    </div>
  );
}

BarcodePage.propTypes = {
  data: PropTypes.object,
  onGetData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetData: payload => dispatch(getData(payload)),
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
