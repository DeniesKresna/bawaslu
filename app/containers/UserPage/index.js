/**
 *
 * InventoryPage
 *
 */

import React, { useEffect, useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _, { debounce } from 'lodash';
import FormBuilder from "@jeremyling/react-material-ui-form-builder";

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectData, makeSelectSearch, makeSelectRoles } from './selectors';
import { changeSearch, changeData, getData, getRoles, deleteRow, changeRow, resetRow } from './actions';
import reducer from './reducer';
import saga from './saga';

import { readableDate, normalizeData } from '../../utils/helpers';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';

const myRed = red[500];
const myYellow = yellow[500];
const myGreen = green[500];

const StyledIconButton = withStyles((theme) => ({
  colorInherit: {backgroundColor: myRed, color: '#FFFFFF'},
  colorPrimary: {backgroundColor: myYellow, color: '#FFFFFF'},
  colorSecondary: {backgroundColor: myGreen, color: '#FFFFFF'}
}))(IconButton);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableContainer = withStyles((theme) => ({
  root: {
    marginTop: 10
  },
}))(TableContainer);

export function InventoryPage({ data, roles, search, onGetData, onGetRoles, onChangeSearch, onChangeData, onChangeRow, onDeleteRow, onResetRow }) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });
  const entity = "Pengguna";

  const delayedGetData = useCallback(debounce(onGetData, 2000), []); 
  useEffect(() => {
    onGetData();
    onGetRoles();
  }, []);

  const [dialogStatus, setDialogStatus] = useState(false);
  const [entityMode, setEntityMode] = useState('create');
  const [form, setForm] = useState({});

  const handleCloseDialog = (md='cancel') => {
    if(md == 'cancel')
      setForm({});
    else
      onChangeRow(form);
    setDialogStatus(false);
  };

  const tableData = normalizeData(data);

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
    }else if(mode == 'reset'){
      if(confirm("Reset Password "+entity+" ini?")){
        onResetRow(rowData);
      }
    }else if(mode == 'edit' || mode == 'create'){
      setDialogStatus(true)
    }else{
      setDialogStatus(true)
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
        label: "Nama",
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
        attribute: "username",
        label: "Nama Pengguna",
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
        attribute: "email",
        label: "Email",
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
        attribute: "phone",
        label: "Telepon",
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
        attribute: "RoleID",
        label: "Role",
        component: "select",
        options: roles,
        // If options is an array of objects, optionConfig is required
        optionConfig: {
          key: "ID", // The attribute to use for the key required for each option
          value: "ID", // The attribute to use to determine the value that should be passed to the form field
          label: "name", // The attribute to use to determine the label for the select option
        },
        props: {
          value: form.RoleID
        }
      },
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
        <meta name="description" content="Pengaturan Pengguna Aplikasi" />
      </Helmet>
      <h1>Halaman {entity}</h1>

      <div>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <TextField label='search' value={search} onChange={changeSearch} />
        </Grid>
        <Grid item md={7}>
        </Grid>
        <Grid item md={2}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={()=>{handleClickOperation('create')}}
          >
            Tambah
          </Button>
        </Grid>
      </Grid>
      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Nama</StyledTableCell>
              <StyledTableCell align="center">Nama Pengguna</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Telepon</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Operasi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { tableData.data.map((row)=>(
              <StyledTableRow key={row.ID}>
                <StyledTableCell align="center">{row.Number}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.username}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                <StyledTableCell align="center">{row.Role != null && row.Role.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <StyledIconButton color="secondary" aria-label="reset" onClick={()=>{handleClickOperation('reset',row)}}>
                    <LockOpenIcon fontSize="small" />
                  </StyledIconButton>
                  <StyledIconButton color="primary" aria-label="ubah" onClick={()=>{handleClickOperation('edit',row)}}>
                    <EditIcon fontSize="small" />
                  </StyledIconButton>
                  <StyledIconButton color="inherit" aria-label="hapus" onClick={()=>{handleClickOperation('delete',row)}}>
                    <DeleteIcon fontSize="small" />
                  </StyledIconButton>
                </StyledTableCell>
              </StyledTableRow>
            )) }
          </TableBody>
          <TableFooter>
            { tableData.data.length > 0 && 
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={tableData.data.length}
                  rowsPerPage={tableData.per_page}
                  page={tableData.current_page-1}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            }
          </TableFooter>
        </Table>
      </StyledTableContainer>
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
    </div>
  );
}

InventoryPage.propTypes = {
  data: PropTypes.object,
  roles: PropTypes.array,
  search: PropTypes.string,
  onGetRoles: PropTypes.func,
  onGetData: PropTypes.func,
  onChangeRow: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangeData: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onResetRow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  search: makeSelectSearch(),
  roles: makeSelectRoles()
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeSearch: payload => dispatch(changeSearch(payload)),
    onChangeData: payload => dispatch(changeData(payload)),
    onChangeRow: payload => dispatch(changeRow(payload)),
    onGetData: evt => dispatch(getData()),
    onGetRoles: evt => dispatch(getRoles()),
    onDeleteRow: payload => dispatch(deleteRow(payload)),
    onResetRow: payload => dispatch(resetRow(payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InventoryPage);
