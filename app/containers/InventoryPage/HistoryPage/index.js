/**
 *
 * HistoryPage
 *
 */

import React, { useEffect, useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _, { debounce } from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectData, makeSelectSearch } from './selectors';
import { changeSearch, changeData, changeRow, getData, deleteRow } from './actions';
import reducer from './reducer';
import saga from './saga';

import { normalizeData } from '../../../utils/helpers';
import CommonTable from '../../../components/CommonTable';
import HistoryDetailForm from '../../../components/Forms/HistoryDetailForm';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export function HistoryPage({ inventoryId, roomList, conditionList, data, search, onGetData, onChangeSearch, onChangeData, onChangeRow, onDeleteRow }) {
  useInjectReducer({ key: 'historyPage', reducer });
  useInjectSaga({ key: 'historyPage', saga });

  const delayedGetData = useCallback(debounce(onGetData, 2000), []); 
  useEffect(() => {
    onGetData(inventoryId);
  }, []);

  const [dialogStatus, setDialogStatus] = useState(false);
  const [entityMode, setEntityMode] = useState('create');
  const [form, setForm] = useState({});

  const handleCloseDialog = (md='cancel', res=null) => {
    if(md == 'cancel'){
      setForm({});
      setDialogStatus(false);
    }
    else{
      setForm(res);
      onChangeRow(res);
      onGetData(inventoryId);
      setDialogStatus(false);
    }
  };

  const tableData = normalizeData(data);
  const columnViewed = ['Number','description','updater_name','entity_type','updated_at','operation'];

  const handleChangePage = (event, newPage) => {
    data.current_page = newPage;
    onChangeData(data);
  };

  const handleChangeRowsPerPage = event => {
    data.per_page = parseInt(event.target.value, 10);
    onChangeData(data);
  };

  const changeSearch = event => {
    onChangeSearch(event.target.value);
    delayedGetData(inventoryId);
  }

  const handleClickOperation = (mode, rowData=null) => {
    setEntityMode(mode);
    if(rowData != null){
      setEntityMode("edit");
      setForm(rowData);
    }else{
      setEntityMode("create");
      setForm({InventoryID: inventoryId});
    }
    if(mode == 'delete'){
      if(confirm("Hapus "+entity+" ini?")){
        onDeleteRow(rowData);
      }
    }else{
      setDialogStatus(true);
    }
  }

  const formLabel = () => {
    let label = "";
    switch(entityMode) {
      case 'edit':
        label = "Ubah";
        break;
      case 'show':
        label = "Lihat";
        break;
      default: 
        label = "Tambah";
    }
    return label + " " + entity;
  }

  return (
    <div>
      <Helmet>
        <meta name="description" content="Pengaturan Barang Inventaris" />
      </Helmet>

      <CommonTable
        search={search}
        tableData={tableData}
        canBeUpdate={true}
        canBeDelete={true}
        onChangeSearch={changeSearch}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onChangePage={handleChangePage}
        onOperationClick={handleClickOperation}
        columns={columnViewed} />

      <Dialog open={dialogStatus} onClose={()=>{handleCloseDialog('cancel')}} maxWidth='lg' fullWidth={true} aria-labelledby="form-dialog-title">
        <DialogContent>
          <HistoryDetailForm rowData={form} title="Ubah Kondisi Barang" conditionList={conditionList} 
            roomList={roomList} onSubmitForm={handleCloseDialog} entityMode={entityMode} />
        </DialogContent>
      </Dialog>

    </div>
  );
}

HistoryPage.propTypes = {
  inventoryId: PropTypes.number,
  roomList: PropTypes.array,
  conditionList: PropTypes.array,
  data: PropTypes.object,
  search: PropTypes.string,
  onGetData: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangeData: PropTypes.func,
  onChangeRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  search: makeSelectSearch()
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeSearch: payload => dispatch(changeSearch(payload)),
    onChangeData: payload => dispatch(changeData(payload)),
    onChangeRow: payload => dispatch(changeRow(payload)),
    onGetData: payload => dispatch(getData(payload)),
    onDeleteRow: payload => dispatch(deleteRow(payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HistoryPage);
