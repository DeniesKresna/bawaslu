/**
 *
 * InventoryDetailPage
 *
 */

import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, useParams } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import FormBuilder from "@jeremyling/react-material-ui-form-builder";

import { getAllQueryParams } from '../../../utils/helpers';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectRowData, makeSelectHistoryList, makeSelectIsBusy } from './selectors';
import { changeRowData, getRowData, getAdditionalData, deleteRowData, changeHistoryData } from './actions';
import { makeSelectList as makeSelectUnitList } from './../../UnitPage/selectors';
import { makeSelectList as makeSelectRoomList } from './../../RoomPage/selectors';
import { makeSelectList as makeSelectGoodsTypeList } from './../../GoodsTypePage/selectors';
import { makeSelectList as makeSelectConditionList } from './../../ConditionPage/selectors';
import reducer from './reducer';
import saga from './saga';
import unitReducer from './../../UnitPage/reducer';
import unitSaga from './../../UnitPage/saga';
import roomReducer from './../../RoomPage/reducer';
import roomSaga from './../../RoomPage/saga';
import goodsTypeReducer from './../../GoodsTypePage/reducer';
import goodsTypeSaga from './../../GoodsTypePage/saga';
import conditionReducer from './../../ConditionPage/reducer';
import conditionSaga from './../../ConditionPage/saga';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import InventoryDetailForm from '../../../components/Forms/InventoryDetailForm'
import HistoryPage from './../HistoryPage'

import './style.css';

export function InventoryDetailPage({ history, rowData, goodsTypeList, unitList, roomList, conditionList, historyList, isBusy, onGetRowData, onGetAdditionalData, onChangeRowData, onDeleteRowData, onChangeHistoryData }) {
  useInjectReducer({ key: 'inventoryDetailPage', reducer: reducer });
  useInjectSaga({ key: 'inventoryDetailPage', saga: saga });
  useInjectReducer({ key: 'unitPage', reducer: unitReducer });
  useInjectSaga({ key: 'unitPage', saga: unitSaga });
  useInjectReducer({ key: 'roomPage', reducer: roomReducer });
  useInjectSaga({ key: 'roomPage', saga: roomSaga });
  useInjectReducer({ key: 'goodsTypePage', reducer: goodsTypeReducer });
  useInjectSaga({ key: 'goodsTypePage', saga: goodsTypeSaga });
  useInjectReducer({ key: 'conditionPage', reducer: conditionReducer });
  useInjectSaga({ key: 'conditionPage', saga: conditionSaga });
  const entity = "Inventaris";

  const [historyForm, setHistoryForm] = useState({});
  const [historyLabel, setHistoryLabel] = useState('');
  const [dialogHistoryStatus, setDialogHistoryStatus] = useState(false);
  const [entityMode, setEntityMode] = useState('create');

  useEffect(() => {
    onGetAdditionalData();      
    const urlParams = getAllQueryParams();
    if(Object.keys(urlParams).length !== 0){
      setEntityMode('edit');
      onGetRowData(urlParams);
    }
  }, []);

  const handleSubmitForm = (md='cancel', data) => {
    if(md != 'cancel'){
      console.log(data);
      onChangeRowData(data);
    }
  };

  const changeHistoryFormImage = (event) => {
    const file = event.target.files[0];
    historyForm['image'] = file;
    if(file)
      historyForm['imageUrl'] = URL.createObjectURL(file);
    else{
      if(historyForm['imageUrl'] == typeof undefined){
        historyForm['imageUrl'] = "https://via.placeholder.com/800x450?text=Create+Employee";
      }
    }
  }

  const formComponentsHistory = () => {
    return ([
      {
        component: "text-field",
        attribute: "name",
        label: "Nama",
        validationType: "string",
        validations: {
          required: true,
        },
      },
      {
        attribute: "historyType",
        label: "Tipe",
        component: "select",
        options: ['room','condition'],
      },
      {
        component: "text-field",
        attribute: "description",
        label: "Deskripsi",
        validationType: "string",
        validations: {
          required: true,
        },
      },
      {
        attribute: "pictureFile",
        label: "Gambar",
        component: "file-upload",
        acceptTypes: "image/*",
        maxSizeMb: 1,
        props: {
          onChange: (event)=>{
            changeHistoryFormImage(event)
          }
        }
      },
      {
        component: "display-image",
        src: historyForm['imageUrl'],
        props: {
          style: {
            height: 225,
            width: 400,
            //objectFit: "cover",
          },
        },
      }
    ]);
  }

  const formLabel = () => {
    let label = "";
    switch(entityMode) {
      case 'edit':
        label = "Lihat / Ubah Detail ";
        break;
      default: 
        label = "Tambah ";
    }
    return label;
  }

  const handleCreateHistory = (mode) => {
    if(mode == 'move')
      setHistoryLabel("Tambah Pemindahan Barang");
    else
      setHistoryLabel("Tambah Kondisi Barang");
    setHistoryForm({});
    setDialogHistoryStatus(true);
  }

  const updateHistoryForm = (key, value) => {
    const copy = JSON.parse(JSON.stringify(historyForm));
    _.set(copy, key, value);
    console.log(copy);
    setHistoryForm(copy);
  };

  const handleCloseDialogHistory = (md='cancel') => {
    if(md != 'cancel')
      onChangeHistoryRowData(historyForm);
    setDialogHistoryStatus(false);
    setHistoryForm({});
  };

  const goBack = () => {
    history.goBack();
  }

  return (
    <div>
      <Helmet>
        <title>{entity}</title>
        <meta name="description" content="Pengaturan Barang Inventaris" />
      </Helmet>
      <Grid container spacing={5}>
        <Grid item md={4}>
          { !isBusy &&
          <InventoryDetailForm goBack={goBack} title={formLabel() + entity} rowData={rowData} unitList={unitList} roomList={roomList} conditionList={conditionList} goodsTypeList={goodsTypeList} 
            onSubmitForm={handleSubmitForm} entityMode={entityMode}
          />
          }
        </Grid>
        <Grid item md={8}>
          { (!isBusy && rowData.hasOwnProperty("ID")) &&
            <div>
              <h3>Perubahan Kondisi Barang</h3>
              <HistoryPage roomList={roomList} conditionList={conditionList} inventoryId={rowData.ID} />
            </div>
          }
        </Grid>
      </Grid>
      <Dialog open={dialogHistoryStatus} onClose={()=>{handleCloseDialogHistory('cancel')}} maxWidth='lg' aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{historyLabel}</DialogTitle>
        <DialogContent>
        <FormBuilder
          fields={formComponentsHistory()}
          form={historyForm}
          updateForm={(key, value) => updateHistoryForm(key, value)}
        />
        </DialogContent>
      </Dialog>
    </div>
  );
}

InventoryDetailPage.propTypes = {
  rowData: PropTypes.object,
  unitList: PropTypes.array,
  roomList: PropTypes.array,
  conditionList: PropTypes.array,
  goodsTypeList: PropTypes.array,
  historyList: PropTypes.array,
  isBusy: PropTypes.bool,
  onGetAdditionalData: PropTypes.func,
  onGetRowData: PropTypes.func,
  onChangeRowData: PropTypes.func,
  onDeleteRowData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  rowData: makeSelectRowData(),
  unitList: makeSelectUnitList(),
  roomList: makeSelectRoomList(), 
  conditionList: makeSelectConditionList(),
  goodsTypeList: makeSelectGoodsTypeList(),
  historyList: makeSelectHistoryList(),
  isBusy: makeSelectIsBusy()
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeRowData: payload => dispatch(changeRowData(payload)),
    onGetRowData: payload => dispatch(getRowData(payload)),
    onGetAdditionalData: evt => dispatch(getAdditionalData()),
    onDeleteRowData: payload => dispatch(deleteRowData(payload)),
    onChangeHistoryRowData: payload => dispatch(changeHistoryData(payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InventoryDetailPage);
