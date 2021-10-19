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
import { makeSelectData, makeSelectDataExist } from './selectors';
import { getData, setDataExist } from './actions';
import reducer from './reducer';
import saga from './saga';

import BarcodeScanner from '../../components/BarcodeScanner/index';
import BarcodeGenerator from '../../components/BarcodeGenerator/index';
import InventoryDetailDialogPage from '../InventoryPage/InventoryDetailDialogPage';
import Button from '@material-ui/core/Button'
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

import Grid from '@material-ui/core/Grid';

export function BarcodePage({ history, data, isLoading, onChangeDataExist, onGetData }) {
  useInjectReducer({ key: 'barcodePage', reducer });
  useInjectSaga({ key: 'barcodePage', saga });
  const entity = "Barcode";

  const [dialogStatus, setDialogStatus] = useState(false);
  const [showScan, setShowScan] = useState(false);

  const handleDetected = res => {
    setShowScan(false)
    const resString = String(res)
    if(resString.includes("-")){
      const splitRes = resString.split("-")
      onGetData({code:splitRes[0], nup:splitRes[1]})
      setDialogStatus(true)
    }else{
      alert("ini bukan barcode SAMAWA")
    }
  }

  const handleCloseDialog = (md='cancel', rowData=null) => {
    //onChangeDataExist();
    if(md=='edit'){
      history.push("/admin/inventory/detail?code="+rowData.GoodsType.ID+"&nup="+rowData.nup)
    }
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
        {showScan && <BarcodeGenerator onHandleDetected={handleDetected} />}
      </Grid>

      { data != null && !isLoading && <InventoryDetailDialogPage id={data.ID} onHandleCloseDialog={handleCloseDialog} dialogStatus={dialogStatus} />
            }
    </div>
  );
}

BarcodePage.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  onGetData: PropTypes.func,
  onChangeDataExist: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  isLoading: makeSelectDataExist()
});

function mapDispatchToProps(dispatch) {
  return {
    onGetData: payload => dispatch(getData(payload)),
    onChangeDataExist: evt => dispatch(setDataExist()),
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
