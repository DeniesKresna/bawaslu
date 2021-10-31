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
import { makeSelectRowData, makeSelectIsBusy, makeSelectActivePeriod } from './selectors';
import { getRowData, getActivePeriod, updateInventoryPeriod } from './actions';
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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import HistoryTimeline from '../../../components/TimeLine/HistoryTimeline';

import {downloadDocs} from '../../../utils/helpers'

import './style.css';

export function InventoryDetailDialogPage({ id, onHandleCloseDialog, isBusy, showPeriodActive, rowData, onGetRowData, dialogStatus, onGetActivePeriod, activePeriod, onUpdateInventoryPeriod }) {
  useInjectReducer({ key: 'inventoryDetailDialogPage', reducer: reducer });
  useInjectSaga({ key: 'inventoryDetailDialogPage', saga: saga });

  useEffect(() => {
      if(showPeriodActive){
        setActive(false);
      }
      rowData = {}
      onGetRowData(id);
      onGetActivePeriod();
  }, [id]);

  useEffect(() => {
    if(rowData != null && rowData.Periods != undefined)
      if(showPeriodActive){
        checkInventoryInActivePeriod();
      }
  }, [rowData]);

  const [active, setActive] = useState(false);

  const onChangeActive = (event) => {
    const inputValue = event.target.checked
    setActive(inputValue);
    onUpdateInventoryPeriod({inventory_id: rowData.ID, period_id: activePeriod.ID, add_mode: inputValue})
  }

  const checkInventoryInActivePeriod = () => {
    rowData.Periods.every(item => {
      if(item.ID == activePeriod.ID){
        setActive(true);
        return false;
      }
      return true;
    });
  }

  return (
    <div>
      {!isBusy && rowData != null && Object.keys(rowData).length > 0 && 
      <Dialog open={dialogStatus} onClose={()=>{onHandleCloseDialog('cancel')}} maxWidth='lg' fullWidth={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Detail Inventaris</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  {activePeriod && showPeriodActive && <Grid item md={12}>
                    <FormControlLabel
                      control={<Checkbox checked={active} onChange={onChangeActive} />}
                      label={"Periode Aktif " + activePeriod.name + "?"}
                    />
                  </Grid>}
                  <Grid item md={12}>
                    {rowData.imageUrl && <img src={serverBaseUrl + "medias?path=" + rowData.imageUrl} height="200"/>}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    Nama
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>{rowData.name}</strong>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    Tipe
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>{rowData.hasOwnProperty('GoodsType') && rowData.GoodsType.name} - {rowData.hasOwnProperty('GoodsType') && rowData.GoodsType.code}</strong>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    NUP
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>{rowData.nup}</strong>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    Tahun Perolehan
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>{rowData.year}</strong>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    Jumlah
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>{rowData.hasOwnProperty('Unit') && rowData.quantity + " " + rowData.Unit.name}</strong>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    Harga Satuan
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>Rp.{rowData.price},-</strong>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    Ruang
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>{rowData.Room.name}</strong>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    Kondisi
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>{rowData.Condition.name}</strong>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    Dokumen Pengadaan
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>{rowData.hasOwnProperty('procurementDocUrl') && <a onClick={() => {downloadDocs(serverBaseUrl + "documents?path=" + rowData.procurementDocUrl)}}>Download</a> }</strong>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    Dokumen Penetapan Status
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <strong>{rowData.hasOwnProperty('statusDocUrl')&& <a href={serverBaseUrl + "documents?path=" + rowData.statusDocUrl}>Download</a> }</strong>
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
  dialogStatus: PropTypes.bool,
  onGetActivePeriod: PropTypes.func,
  activePeriod: PropTypes.object,
  onUpdateInventoryPeriod: PropTypes.func,
  showPeriodActive: PropTypes.bool
};

InventoryDetailDialogPage.defaultProps = {
  showPeriodActive: true
}

const mapStateToProps = createStructuredSelector({
  rowData: makeSelectRowData(),
  isBusy: makeSelectIsBusy(),
  activePeriod: makeSelectActivePeriod()
});

function mapDispatchToProps(dispatch) {
  return {
    onGetRowData: payload => dispatch(getRowData(payload)),
    onGetActivePeriod: evt => dispatch(getActivePeriod()),
    onUpdateInventoryPeriod: payload => dispatch(updateInventoryPeriod(payload))
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
