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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectData, makeSelectSearch } from './selectors';
import { changeSearch, changeData, getData, deleteRow, exportData } from './actions';
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
import GridOnIcon from '@material-ui/icons/GridOn';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';

import InventoryDetailDialogPage from './InventoryDetailDialogPage';

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

export function InventoryPage({ history, data, onExportData, search, onGetData, onChangeSearch, onChangeData, onDeleteRow }) {
  useInjectReducer({ key: 'inventoryPage', reducer });
  useInjectSaga({ key: 'inventoryPage', saga });
  const entity = "Master Data Inventaris";

  const delayedGetData = useCallback(debounce(onGetData, 2000), []); 
  useEffect(() => {
    onGetData();
  }, []);

  const [dialogStatus, setDialogStatus] = useState(false);
  const [entityMode, setEntityMode] = useState('create');
  const [inventoryId, setInventoryId] = useState(null);

  const handleCloseDialog = (md='cancel', rowData=null) => {
    if(md=='edit'){
      history.push("/admin/inventory/detail?code="+rowData.GoodsType.ID+"&nup="+rowData.nup)
    }
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
    if(mode == 'delete'){
      if(confirm("Hapus "+entity+" ini?")){
        onDeleteRow(rowData);
      }
    }else if(mode == 'edit'){
      history.push("/admin/inventory/detail?code="+rowData.GoodsType.ID+"&nup="+rowData.nup)
    }else if(mode == 'create'){
      history.push("/admin/inventory/create")
    }else if(mode == 'export'){
      onExportData()
    }else{
      setInventoryId(rowData.ID)
      console.log(rowData.ID)
      setDialogStatus(true)
    }
  }

  return (
    <div>
      <Helmet>
        <title>{entity}</title>
        <meta name="description" content="Pengaturan Barang Inventaris" />
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<GridOnIcon />}
            onClick={()=>{handleClickOperation('export')}}
          >
            Export
          </Button>
        </Grid>
      </Grid>
      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">Nama</StyledTableCell>
              <StyledTableCell align="center">Tipe</StyledTableCell>
              <StyledTableCell align="center">Kode</StyledTableCell>
              <StyledTableCell align="center">NUP</StyledTableCell>
              <StyledTableCell align="center">Satuan</StyledTableCell>
              <StyledTableCell align="center">Kuantitas</StyledTableCell>
              <StyledTableCell align="center">Harga</StyledTableCell>
              {/*<StyledTableCell align="center">Kondisi</StyledTableCell>
              <StyledTableCell align="center">Ruang</StyledTableCell>*/}
              <StyledTableCell align="center">Operasi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { tableData.data.map((row)=>(
              <StyledTableRow key={row.ID}>
                <StyledTableCell align="center">{row.Number}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.GoodsType != null && row.GoodsType.name}</StyledTableCell>
                <StyledTableCell align="center">{row.GoodsType != null && row.GoodsType.code}</StyledTableCell>
                <StyledTableCell align="center">{row.nup}</StyledTableCell>
                <StyledTableCell align="center">{row.Unit != null && row.Unit.name}</StyledTableCell>
                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                {/*<StyledTableCell align="center">{row.Conditions.length > 0 && row.Conditions[0].Condition.name}</StyledTableCell>
                <StyledTableCell align="center">{row.Rooms.length > 0 && row.Rooms[0].Room.name}</StyledTableCell>*/}
                <StyledTableCell align="center">
                  <StyledIconButton color="secondary" aria-label="lihat" onClick={()=>{handleClickOperation('show',row)}}>
                    <VisibilityIcon fontSize="small" />
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
    </div>
    { inventoryId != null && <InventoryDetailDialogPage id={inventoryId} onHandleCloseDialog={handleCloseDialog} dialogStatus={dialogStatus} />
    }
    </div>
  );
}

InventoryPage.propTypes = {
  data: PropTypes.object,
  onExportData: PropTypes.func,
  search: PropTypes.string,
  onGetData: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangeData: PropTypes.func,
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
    onExportData: paylaod => dispatch(exportData()),
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
)(InventoryPage);
