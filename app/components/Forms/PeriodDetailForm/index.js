/**
 *
 * HistoryDetailForm
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
// import styled from 'styled-components';

import { dateTimeNow } from '../../../utils/helpers';
import { serverBaseUrl } from '../../../utils/api';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

function PeriodDetailForm({
  title, rowData, onSubmitForm, entityMode
}) {

  let rowDataCopy = JSON.parse(JSON.stringify(rowData));

  const getStartTime = () => {
    if(rowDataCopy.hasOwnProperty('start_time')){
      return rowDataCopy.start_time.substring(0,16)
    }else{
      return dateTimeNow()
    }
  }

  const getActive = () =>{
    if(rowDataCopy.hasOwnProperty('active')){
      if(rowDataCopy.active == 'ya'){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }

  const [active, setActive] = useState({value:getActive(), error: false, helperText: ''});
  const [name, setName] = useState({value:rowDataCopy.name, error:false, helperText: ''})
  const [startTime, setStartTime] = useState({value:getStartTime(), error:false, helperText: ''})
  
  const handleSubmitForm = (md) => {
    let result = {}
    if(active.value != null){
      if(active.value == true){
        result.active= 1
      }else{
        result.active = 0
      }
    }
    if(name.value != null)
      result.name = name.value
    if(startTime.value != null){
      result.start_time = startTime.value + ":00+07:00";
    }
    if(rowData.hasOwnProperty('ID')){
      result.ID = rowData.ID
    }
    onSubmitForm(md, result)
  }

  const onChangeStartTime = (event) => {
    const inputValue = event.target.value
    let field = {...startTime}
    if(inputValue.length == 0){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue
    setStartTime(field);
  }

  const onChangeActive = (event) => {
    const inputValue = event.target.checked
    let field = {...active}
    field.value = inputValue
    setActive(field);
  }

  const onChangeName = (event) => {
    const inputValue = event.target.value
    let field = {...name}
    field.value = inputValue
    setName(field);
  }

  return (
    <div>
      <h3>{title}</h3>
      <Grid container spacing={5}>
        <Grid item md={12}>
          <TextField label='Nama Periode' value={name.value || ''} onChange={onChangeName} error={name.error} helperText={name.helperText} fullWidth />
        </Grid>
        <Grid item md={12}>
          <TextField label='Tanggal Mulai' onChange={onChangeStartTime} type="datetime-local" error={startTime.error} helperText={startTime.helperText} 
          value={startTime.value} InputLabelProps={{shrink: true}} fullWidth />
        </Grid>
        <Grid item md={12}>
          <FormControlLabel
            control={<Checkbox checked={active.value} onChange={onChangeActive} />}
            label="Aktif"
          />
        </Grid>

        <Grid item md={12}>
          <Button onClick={()=>{handleSubmitForm('cancel')}} color="secondary">
              Tutup
            </Button>
            {entityMode != 'show' && <Button onClick={()=>{handleSubmitForm('submit')}} color="primary">
              Simpan
          </Button>}
        </Grid>
      </Grid>
    </div>
  )
}

PeriodDetailForm.propTypes = {
  title: PropTypes.string,
  rowData: PropTypes.object,
  onSubmitForm: PropTypes.func,
  entityMode: PropTypes.string
};

export default memo(PeriodDetailForm);
