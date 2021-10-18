/**
 *
 * InventoryDetailDialogPage
 *
 */

import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectRowData, makeSelectIsBusy } from './selectors';
import { getRowData } from './actions';
import reducer from './reducer';
import saga from './saga';

import { serverBaseUrl } from '../../../utils/api';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import HistoryTimeline from '../../../components/TimeLine/HistoryTimeline';

import {downloadDocs} from '../../../utils/helpers'

import './style.css';

export function InventoryDetailDialogPage({ id, onHandleCloseDialog, isBusy, rowData, onGetRowData, dialogStatus }) {
  useInjectReducer({ key: 'inventoryDetailDialogPage', reducer: reducer });
  useInjectSaga({ key: 'inventoryDetailDialogPage', saga: saga });

  useEffect(() => {
      rowData = {}
      onGetRowData(id);
  }, [id]);

  return (
    <div>
      {!isBusy &&
      <Dialog open={dialogStatus} onClose={()=>{onHandleCloseDialog('cancel')}} maxWidth='lg' fullWidth={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Detail Inventaris</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item md={12}>
                    {rowData.imageUrl && <img src={serverBaseUrl + "medias?path=" + rowData.imageUrl} height="200"/>}
                  </Grid>
                  <Grid item md={6}>
                    Nama
                  </Grid>
                  <Grid item md={6}>
                    : {rowData.name}
                  </Grid>
                  <Grid item md={6}>
                    Tipe
                  </Grid>
                  <Grid item md={6}>
                    : {rowData.hasOwnProperty('GoodsType') && rowData.GoodsType.name} - {rowData.hasOwnProperty('GoodsType') && rowData.GoodsType.code}
                  </Grid>
                  <Grid item md={6}>
                    NUP
                  </Grid>
                  <Grid item md={6}>
                    : {rowData.nup}
                  </Grid>
                  <Grid item md={6}>
                    Tahun Perolehan
                  </Grid>
                  <Grid item md={6}>
                    : {rowData.year}
                  </Grid>
                  <Grid item md={6}>
                    Jumlah
                  </Grid>
                  <Grid item md={6}>
                    : {rowData.hasOwnProperty('Unit') && rowData.quantity + " " + rowData.Unit.name}
                  </Grid>
                  <Grid item md={6}>
                    Harga Satuan
                  </Grid>
                  <Grid item md={6}>
                    : {rowData.price}
                  </Grid>
                  <Grid item md={6}>
                    Dokumen Pengadaan
                  </Grid>
                  <Grid item md={6}>
                    : {rowData.hasOwnProperty('procurementDocUrl') && <a onClick={() => {downloadDocs(serverBaseUrl + "documents?path=" + rowData.procurementDocUrl)}}>Download</a> }
                  </Grid>
                  <Grid item md={6}>
                    Dokumen Penetapan Status
                  </Grid>
                  <Grid item md={6}>
                    : {rowData.hasOwnProperty('statusDocUrl')&& <a href={serverBaseUrl + "documents?path=" + rowData.statusDocUrl}>Download</a> }
                  </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={8}>
                <HistoryTimeline historyData={rowData.Histories} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{onHandleCloseDialog('edit',rowData)}} color="primary">
            Ubah
          </Button>
          <Button onClick={()=>{onHandleCloseDialog('cancel')}} color="secondary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
      }
    </div>
  );
}

InventoryDetailDialogPage.propTypes = {
  isBusy: PropTypes.bool,
  id: PropTypes.number,
  rowData: PropTypes.object,
  onGetRowData: PropTypes.func,
  onHandleCloseDialog: PropTypes.func,
  dialogStatus: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  rowData: makeSelectRowData(),
  isBusy: makeSelectIsBusy()
});

function mapDispatchToProps(dispatch) {
  return {
    onGetRowData: payload => dispatch(getRowData(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InventoryDetailDialogPage);
