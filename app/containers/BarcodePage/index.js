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
import { makeSelectData, makeSelectDataExist, makeSelectGoodsTypeDataExist } from './selectors';
import { getData, getGoodsType, setDataExist } from './actions';
import reducer from './reducer';
import saga from './saga';
import goodsTypeReducer from '../GoodsTypePage/reducer';
import goodsTypeSaga from '../GoodsTypePage/saga';

import BarcodeScanner from '../../components/BarcodeScanner/index';
import BarcodeGenerator from '../../components/BarcodeGenerator/index';
import InventoryDetailDialogPage from '../InventoryPage/InventoryDetailDialogPage';
import Button from '@material-ui/core/Button'
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import PrintIcon from '@material-ui/icons/Print';

import Grid from '@material-ui/core/Grid';

export function BarcodePage({ history, data, isLoading, onChangeDataExist, onGetData, goodsTypeData, onGetGoodsType }) {
  useInjectReducer({ key: 'barcodePage', reducer });
  useInjectSaga({ key: 'barcodePage', saga });
  useInjectReducer({ key: 'goodsTypePage', reducer: goodsTypeReducer });
  useInjectSaga({ key: 'goodsTypePage', saga: goodsTypeSaga });
  const entity = "Barcode";

  const [dialogStatus, setDialogStatus] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);

  useEffect(() => {
    onGetGoodsType()
  },[])

  const handleDetected = res => {
    setShowScan(false)
    const resString = String(res)
    if(resString.includes("bawaslusamari-")){
      const splitRes = resString.split("-")
      onGetData({code:splitRes[1], nup:splitRes[2]})
      setDialogStatus(true)
    }else{
      alert("ini bukan barcode SAMARI")
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
    setShowGenerate(false)
    setShowScan(!showScan)
}
const handleToggleGenerate = () => {
  setShowScan(false)
  setShowGenerate(!showGenerate)
}

  return (
    <div>
      <Helmet>
        <title>{entity}</title>
        <meta name="description" content="Halaman QR Code" />
      </Helmet>
      <h1>QR Code</h1>
      <Grid>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AspectRatioIcon />}
            onClick={handleToggleScan}
            style={{marginRight:"5px"}}
          >
            Scan QR Code
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<PrintIcon />}
            onClick={handleToggleGenerate}
          >
            Generate QR Code
          </Button>
        {showScan && <BarcodeScanner onHandleDetected={handleDetected} />}
        {showGenerate && <BarcodeGenerator goodsTypes={goodsTypeData} />}
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
  onGetGoodsType: PropTypes.func,
  goodsTypeData: PropTypes.array,
  onChangeDataExist: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  isLoading: makeSelectDataExist(),
  goodsTypeData: makeSelectGoodsTypeDataExist()
});

function mapDispatchToProps(dispatch) {
  return {
    onGetData: payload => dispatch(getData(payload)),
    onGetGoodsType: evt => dispatch(getGoodsType()),
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
