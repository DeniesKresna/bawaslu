/**
 *
 * PeriodPage
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

import { normalizeData } from '../../utils/helpers';
import CommonTable from '../../components/CommonTable';
import PeriodDetailForm from '../../components/Forms/PeriodDetailForm';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export function PeriodPage({ data, search, onGetData, onChangeSearch, onChangeData, onChangeRow, onDeleteRow }) {
  useInjectReducer({ key: 'periodPage', reducer });
  useInjectSaga({ key: 'periodPage', saga });
  const delayedGetData = useCallback(debounce(onGetData, 2000), []); 
  useEffect(() => {
    onGetData();
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
      setDialogStatus(false);
    }
  };

  const tableData = normalizeData(data);
  const columnViewed = ['Number','name','updater','start_time','active','updated_at','operation'];

  const handleChangePage = (event, newPage) => {
    data.current_page = newPage+1;
    onChangeData(data);
  };

  const handleChangeRowsPerPage = event => {
    data.per_page = parseInt(event.target.value, 10);
    onChangeData(data);
  };

  const changeSearch = event => {
    onChangeSearch(event.target.value);
    delayedGetData();
  }

  const handleClickOperation = (mode, rowData=null) => {
    setEntityMode(mode);
    if(rowData != null){
      setEntityMode("edit");
      setForm(rowData);
    }else{
      setEntityMode("create")
    }
    if(mode == 'delete'){
      if(confirm("Hapus "+entity+" ini?")){
        onDeleteRow(rowData);
      }
    }else{
      setDialogStatus(true);
    }
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
          <PeriodDetailForm rowData={form} title={entityMode=='create'? 'Tambah Periode': 'Ubah Periode'} onSubmitForm={handleCloseDialog} entityMode={entityMode} />
        </DialogContent>
      </Dialog>

    </div>
  );
}

PeriodPage.propTypes = {
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
    onGetData: evt => dispatch(getData()),
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
)(PeriodPage);
