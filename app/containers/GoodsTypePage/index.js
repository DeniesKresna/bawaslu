/**
 *
 * GoodsTypePage
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

import { normalizeData } from '../../utils/helpers';
import CommonTable from '../../components/CommonTable';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export function GoodsTypePage({ data, search, onGetData, onChangeSearch, onChangeData, onChangeRow, onDeleteRow }) {
  useInjectReducer({ key: 'goodsTypePage', reducer });
  useInjectSaga({ key: 'goodsTypePage', saga });
  const entity = "Tipe Barang";

  const delayedGetData = useCallback(debounce(onGetData, 2000), []); 
  useEffect(() => {
    onGetData();
  }, []);

  const [dialogStatus, setDialogStatus] = useState(false);
  const [entityMode, setEntityMode] = useState('create');
  const [form, setForm] = useState({});

  const handleCloseDialog = (md='cancel') => {
    if(md == 'cancel')
      setForm({});
    else{
      onChangeRow(form);
    }
    setDialogStatus(false);
  };

  const tableData = normalizeData(data);
  const columnViewed = ['Number','name','code','updater','updated_at','operation'];

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
    delayedGetData();
  }

  const handleClickOperation = (mode, rowData=null) => {
    setEntityMode(mode);
    if(rowData != null){
      setForm(rowData);
    }
    if(mode == 'delete'){
      if(confirm("Hapus "+entity+" ini?")){
        onDeleteRow(rowData);
      }
    }else{
      setDialogStatus(true);
    }
  }

  const updateForm = (key, value) => {
    const copy = JSON.parse(JSON.stringify(form));
    _.set(copy, key, value);
    setForm(copy);
  };

  const formComponents = () => {
    let disabled = false;
    disabled = entityMode == 'show';
    return ([
      {
        component: "text-field",
        attribute: "name",
        label: "Name",
        col: {
          sm: 6
        },
        props:{
          InputProps: {
            readOnly: disabled
          }
        },
        validationType: "string",
        validations: {
          required: true,
          max: 50,
        },
      },
      {
        component: "text-field",
        attribute: "code",
        label: "Code",
        col: {
          sm: 6
        },
        props:{
          InputProps: {
            readOnly: disabled
          }
        },
        validationType: "string",
        validations: {
          required: true,
          max: 50,
        },
      }
    ]);
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
        <title>{entity}</title>
        <meta name="description" content="Pengaturan Barang Inventaris" />
      </Helmet>
      <h1>Pengaturan {entity}</h1>

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
        <DialogTitle id="form-dialog-title">{formLabel()}</DialogTitle>
        <DialogContent>
        <FormBuilder
          fields={formComponents()}
          form={form}
          updateForm={(key, value) => updateForm(key, value)}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleCloseDialog('cancel')}} color="secondary">
            Tutup
          </Button>
          {entityMode != 'show' && <Button onClick={()=>{handleCloseDialog('submit')}} color="primary">
            Simpan
          </Button>}
        </DialogActions>
      </Dialog>

    </div>
  );
}

GoodsTypePage.propTypes = {
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
)(GoodsTypePage);
