/**
 *
 * CommonTable
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

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
import PhotoIcon from '@material-ui/icons/Photo';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';

import { serverBaseUrl } from '../../utils/api';
import { readableDateHour } from '../../utils/helpers';

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

function CommonTable({tableData, search, columns, canBeUpdate, canBeDelete, onChangeSearch, onChangePage, onChangeRowsPerPage, onOperationClick}) {
  
  const [imageUrl, setImageUrl] = useState('');
  const [dialogStatus, setDialogStatus] = useState(false);

  const renderHeadColumns = col => {
    switch(col){
      case 'Number':
        return <StyledTableCell key={col} align="right">#</StyledTableCell>
      case 'updater':
        return <StyledTableCell key={col} align="right">Pengupdate</StyledTableCell>
      case 'updater_name':
          return <StyledTableCell key={col} align="right">Pengupdate</StyledTableCell>
      case 'updated_at':
        return <StyledTableCell key={col} align="right">Diupdate pada</StyledTableCell>
      case 'operation':
        return <StyledTableCell key={col} align="right">Operasi</StyledTableCell>
      case 'name':
        return <StyledTableCell key={col} align="right">Nama</StyledTableCell>
      case 'description':
        return <StyledTableCell key={col} align="right">Keterangan</StyledTableCell>
      case 'entity_type':
        return <StyledTableCell key={col} align="right">Perubahan</StyledTableCell>
      case 'code':
        return <StyledTableCell key={col} align="right">Kode</StyledTableCell>
      case 'image_url':
        return <StyledTableCell key={col} align="right">Gambar</StyledTableCell>
      default:
        return <StyledTableCell key={col} align="right">{col}</StyledTableCell>
    }
  }
  
  const renderRowColumns = (row,col, onOperationClick, imageAction=false) => {
    switch(col){
      case 'entity_type':
        return (<StyledTableCell key={col} align="right">
          {row.entity_type == 'room'? "Pindah Ruangan ke "+row.entity_name+" pada "+readableDateHour(row.history_time):"Kondisi barang "+row.entity_name+" pada "+readableDateHour(row.history_time)}
        </StyledTableCell>)
      case 'updater':
        return <StyledTableCell key={col} align="right">{row.Updater.name}</StyledTableCell>
      case 'operation':
        return (
          <StyledTableCell key={col} align="right">
            { row.hasOwnProperty('image_url') && 
              <StyledIconButton color="secondary" aria-label="lihat gambar" onClick={()=>{showImage(row.image_url)}}>
                <PhotoIcon fontSize="small" />
              </StyledIconButton>
            }
            {canBeUpdate && <StyledIconButton color="primary" aria-label="ubah" onClick={()=>{onOperationClick('edit',row)}}>
              <EditIcon fontSize="small" />
            </StyledIconButton>}
            {canBeDelete && <StyledIconButton color="inherit" aria-label="hapus" onClick={()=>{onOperationClick('delete',row)}}>
              <DeleteIcon fontSize="small" />
            </StyledIconButton>}
          </StyledTableCell>
        )
      default:
        return <StyledTableCell key={col} align="right">{row[col]}</StyledTableCell>
    }
  }

  const showImage = (val) => {
    setImageUrl(val);
    setDialogStatus(true);
  }

  const handleCloseDialog = () => {
    setDialogStatus(false);
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={3}>
          <TextField label='search' value={search} onChange={onChangeSearch} />
        </Grid>
        <Grid item md={7}>
        </Grid>
        <Grid item md={2}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={()=>{onOperationClick('create')}}
          >
            Tambah
          </Button>
        </Grid>
      </Grid>
      <StyledTableContainer component={Paper}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              { columns.map(col => 
                renderHeadColumns(col)
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.data.map((row) => (
              <StyledTableRow key={row.ID}>
                { columns.map(col => 
                  renderRowColumns(row,col,onOperationClick)
                )}
              </StyledTableRow>
            ))}
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
                  onPageChange={onChangePage}
                  onRowsPerPageChange={onChangeRowsPerPage}
                />
              </TableRow>
            }
          </TableFooter>
        </Table>
      </StyledTableContainer>
      <Dialog open={dialogStatus} onClose={handleCloseDialog} maxWidth='lg' aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Gambar</DialogTitle>
        <DialogContent>
          <img src={serverBaseUrl + 'medias?path=' + imageUrl} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

CommonTable.propTypes = {
  tableData: PropTypes.object,
  columns: PropTypes.array,
  search: PropTypes.string,
  canBeUpdate: PropTypes.bool,
  canBeDelete: PropTypes.bool,
  onChangeSearch: PropTypes.func,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
  onOperationClick: PropTypes.func
};

export default memo(CommonTable);
