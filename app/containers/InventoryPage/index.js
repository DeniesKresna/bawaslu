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
import { makeSelectData, makeSelectSearch, makeSelectFiltered } from './selectors';
import { changeSearch, changeData, getData, getAdditionalData, deleteRow, exportData, changeFiltered } from './actions';
import { makeSelectList as makeSelectUnitList } from '../UnitPage/selectors';
import { makeSelectList as makeSelectRoomList } from '../RoomPage/selectors';
import { makeSelectList as makeSelectGoodsTypeList } from '../GoodsTypePage/selectors';
import { makeSelectList as makeSelectConditionList } from '../ConditionPage/selectors';
import reducer from './reducer';
import saga from './saga';
import unitReducer from '../UnitPage/reducer';
import unitSaga from '../UnitPage/saga';
import roomReducer from '../RoomPage/reducer';
import roomSaga from '../RoomPage/saga';
import goodsTypeReducer from '../GoodsTypePage/reducer';
import goodsTypeSaga from '../GoodsTypePage/saga';
import conditionReducer from '../ConditionPage/reducer';
import conditionSaga from '../ConditionPage/saga';

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

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

export function InventoryPage({ history, data, onExportData, search, onGetData, onChangeSearch, onChangeData, onChangeFiltered, onDeleteRow,
  units, goodsTypes, conditions, rooms, onGetAdditionalData, filtered }) {
  useInjectReducer({ key: 'inventoryPage', reducer });
  useInjectSaga({ key: 'inventoryPage', saga });
  useInjectReducer({ key: 'unitPage', reducer: unitReducer });
  useInjectSaga({ key: 'unitPage', saga: unitSaga });
  useInjectReducer({ key: 'roomPage', reducer: roomReducer });
  useInjectSaga({ key: 'roomPage', saga: roomSaga });
  useInjectReducer({ key: 'goodsTypePage', reducer: goodsTypeReducer });
  useInjectSaga({ key: 'goodsTypePage', saga: goodsTypeSaga });
  useInjectReducer({ key: 'conditionPage', reducer: conditionReducer });
  useInjectSaga({ key: 'conditionPage', saga: conditionSaga });
  const entity = "Master Data Inventaris";

  const delayedGetData = useCallback(debounce(onGetData, 2000), []); 
  useEffect(() => {
    onGetAdditionalData(); 
    onGetData();
  }, []);

  const [dialogStatus, setDialogStatus] = useState(false);
  const [entityMode, setEntityMode] = useState('create');
  const [inventoryId, setInventoryId] = useState(null);
  const [unit, setUnit] = useState(0);
  const [goodsType, setGoodsType] = useState(0);
  const [room, setRoom] = useState(0);
  const [condition, setCondition] = useState(0);

  const handleCloseDialog = (md='cancel', rowData=null) => {
    if(md=='edit'){
      history.push("/admin/inventory/detail?code="+rowData.GoodsType.ID+"&nup="+rowData.nup)
    }
    setDialogStatus(false);
  };

  const tableData = normalizeData(data);

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
    if(mode == 'delete'){
      if(confirm("Hapus "+entity+" ini?")){
        onDeleteRow(rowData);
      }
    }else if(mode == 'edit'){
      history.push("/admin/inventory/detail?code="+rowData.goods_type_id+"&nup="+rowData.nup)
    }else if(mode == 'create'){
      history.push("/admin/inventory/create")
    }else if(mode == 'export'){
      onExportData()
    }else{
      setInventoryId(rowData.ID)
      setDialogStatus(true)
    }
  }

  const handleChangeUnit = (event) => {
    setUnit(event.target.value);
    filtered.unit = event.target.value;
    onChangeFiltered({...filtered})
  }

  const handleChangeGoodsType = (event) => {
    setGoodsType(event.target.value);
    filtered.goodsType = event.target.value;
    onChangeFiltered({...filtered})
  }

  const handleChangeRoom = (event) => {
    setRoom(event.target.value);
    filtered.room = event.target.value;
    onChangeFiltered({...filtered})
  }

  const handleChangeCondition = (event) => {
    setCondition(event.target.value);
    filtered.condition = event.target.value;
    onChangeFiltered({...filtered})
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
        <Grid item md={10}>
          <Grid container spacing={3}>
            <Grid item md={2}>
              <TextField label='search' value={search} onChange={changeSearch} fullWidth />
            </Grid>{goodsTypes != undefined &&
            <Grid item md={2}>
              <FormControl fullWidth>
                <InputLabel id="select-type-label">Tipe</InputLabel>
                <Select
                  labelId="select-type-label"
                  id="select-type"
                  defaultValue=""
                  onChange={handleChangeGoodsType}
                >
                  <MenuItem value={0}>Semua</MenuItem>
                  { goodsTypes.map(item => (
                      <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>}{units != undefined &&
            <Grid item md={2}>
              <FormControl fullWidth>
                <InputLabel id="select-unit-label">Satuan</InputLabel>
                <Select
                  labelId="select-unit-label"
                  id="select-unit"
                  defaultValue=""
                  onChange={handleChangeUnit}
                >
                  <MenuItem value={0}>Semua</MenuItem>
                  { units.map(item => (
                      <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>}{conditions != undefined &&
            <Grid item md={2}>
              <FormControl fullWidth>
                <InputLabel id="select-condition-label">Kondisi</InputLabel>
                <Select
                  labelId="select-condition-label"
                  id="select-condition"
                  defaultValue=""
                  onChange={handleChangeCondition}
                >
                  <MenuItem value={0}>Semua</MenuItem>
                  { conditions.map(item => (
                      <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>}{rooms != undefined &&
            <Grid item md={2}>
              <FormControl fullWidth>
                <InputLabel id="select-room-label">Ruang</InputLabel>
                <Select
                  labelId="select-room-label"
                  id="select-room"
                  defaultValue=""
                  onChange={handleChangeRoom}
                >
                  <MenuItem value={0}>Semua</MenuItem>
                  { rooms.map(item => (
                      <MenuItem value={item.ID} key={item.ID}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>}
          </Grid>
        </Grid>
        <Grid item md={2}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={()=>{handleClickOperation('create')}}
          >
            Tambah
          </Button>{/*
          <Button
            variant="contained"
            color="primary"
            startIcon={<GridOnIcon />}
            onClick={()=>{handleClickOperation('export')}}
          >
            Export
          </Button>*/}
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
              <StyledTableCell align="center">Kondisi</StyledTableCell>
              <StyledTableCell align="center">Ruang</StyledTableCell>
              <StyledTableCell align="center">Operasi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { tableData.data.map((row)=>(
              <StyledTableRow key={row.ID}>
                <StyledTableCell align="center">{row.Number}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.goods_type_name}</StyledTableCell>
                <StyledTableCell align="center">{row.goods_type_code}</StyledTableCell>
                <StyledTableCell align="center">{row.nup}</StyledTableCell>
                <StyledTableCell align="center">{row.unit_name}</StyledTableCell>
                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">{row.condition_name}</StyledTableCell>
                <StyledTableCell align="center">{row.room_name}</StyledTableCell>
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
                  count={tableData.total}
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
    { inventoryId != null && <InventoryDetailDialogPage id={inventoryId} showPeriodActive={false} onHandleCloseDialog={handleCloseDialog} dialogStatus={dialogStatus} />
    }
    </div>
  );
}

InventoryPage.propTypes = {
  data: PropTypes.object,
  onExportData: PropTypes.func,
  search: PropTypes.string,
  onGetData: PropTypes.func,
  onGetAdditionalData: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangeData: PropTypes.func,
  onChangeFiltered: PropTypes.func,
  onDeleteRow: PropTypes.func,
  unit: PropTypes.array,
  goodsTypes: PropTypes.array,
  rooms: PropTypes.array,
  conditions: PropTypes.array,
  filtered: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  search: makeSelectSearch(),
  units: makeSelectUnitList(),
  goodsTypes: makeSelectGoodsTypeList(),
  rooms: makeSelectRoomList(),
  conditions: makeSelectConditionList(),
  filtered: makeSelectFiltered()
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeSearch: payload => dispatch(changeSearch(payload)),
    onChangeData: payload => dispatch(changeData(payload)),
    onChangeFiltered: payload => dispatch(changeFiltered(payload)),
    onGetAdditionalData: evt => dispatch(getAdditionalData()),
    onExportData: evt => dispatch(exportData()),
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
