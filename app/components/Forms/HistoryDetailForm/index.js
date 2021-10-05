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
import Autocomplete from '@material-ui/lab/Autocomplete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

function HistoryDetailForm({
  title, rowData, roomList, conditionList, onSubmitForm, entityMode
}) {

  let rowDataCopy = JSON.parse(JSON.stringify(rowData));
  const getHistoryTime = () => {
    if(rowDataCopy.hasOwnProperty('history_time')){
      return rowDataCopy.history_time.substring(0,16)
    }else{
      return dateTimeNow()
    }
  }

  const [entityType, setEntityType] = useState({value:rowDataCopy.entity_type, error: false, helperText: ''});
  const [entityId, setEntityId] = useState({value:rowDataCopy.EntityID, error: false, helperText: ''});
  const [image, setImage] = useState({value:'', error: false, helperText: ''});
  const [imageUrl, setImageUrl] = useState(rowDataCopy.image_url != ""?serverBaseUrl + 'medias?path=' + rowDataCopy.image_url:null);
  const [description, setDescription] = useState({value:rowDataCopy.description, error:false, helperText: ''})
  const [moveTime, setMoveTime] = useState({value:getHistoryTime(), error:false, helperText: ''})
  
  const handleSubmitForm = (md) => {
    let result = {}
    if(entityId.value != null)
      result.EntityID = parseInt(entityId.value)
    if(entityType.value != null)
      result.entity_type = entityType.value
    if(image.value != null)
      result.image = image.value
    if(description.value != null)
      result.description = description.value
    if(moveTime.value != null){
      result.history_time = moveTime.value + ":00+07:00";
    }
    if(rowData.hasOwnProperty('ID')){
      result.ID = rowData.ID
    }
    result.InventoryID = rowDataCopy.InventoryID

    console.log(result)
    onSubmitForm(md, result)
  }

  const onChangeEntityId = (event, newValue) => {
    const inputValue = newValue
    let field = {...entityId}
    if(inputValue == null){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue.ID
    setEntityId(field);
  }

  const onChangeEntityType= (event, newValue) => {
    const inputValue = newValue
    setEntityId({value:null, error: false, helperText: ''})
    let field = {...entityType}
    if(inputValue == null){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue.ID
    setEntityType(field);
  }

  const onChangeImage = (event) => {
    const inputValue = event.target.files[0];
    let field = {}
    if(inputValue == null){
      field.error = true,
      field.helperText = "wajib diisi"
    }else if(inputValue.size/1024/1024 > 2){
      field.error = true,
      field.helperText = "jangan lebih dari 2 mb"
      return
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue
    setImageUrl(URL.createObjectURL(inputValue));
    setImage(field);
  }

  const onChangeMoveTime = (event) => {
    const inputValue = event.target.value
    let field = {...moveTime}
    if(inputValue.length == 0){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue
    setMoveTime(field);
  }

  const onChangeDescription = (event) => {
    const inputValue = event.target.value
    let field = {...description}
    field.value = inputValue
    setDescription(field);
  }

  const findObjectById = (arr, id=null) => {
    const item = arr.find((opt)=>{
      if (opt.ID == id)
        return opt;
    })
    return item || {};
  }

  const entityIdList = () => {
    if(entityType.value == 'room'){
      return roomList;
    }else{
      return conditionList;
    }
  }

  const entityTypeList = [{
      ID: "room",
      name: "Ruangan"
    },{
      ID: "condition",
      name: "Kondisi"
    }
  ];

  return (
    <div>
      <h3>{title}</h3>
      <Grid container spacing={5}>
        <Grid item md={12}>
          <Autocomplete options={entityTypeList} getOptionLabel={(option) => option.name || ''} value={findObjectById(entityTypeList, entityType.value)}
           getOptionSelected={(option, value) => option.ID === value.ID || {}} onChange={onChangeEntityType}
            renderInput={(params) => <TextField {...params} label='Jenis kondisi yang diubah' error={entityType.error} helperText={entityType.helperText} fullWidth />}
          />
        </Grid>
        <Grid item md={12}>
          <Autocomplete options={entityIdList()} getOptionLabel={(option) => option.name || ''} value={findObjectById(entityIdList(), entityId.value)}
           getOptionSelected={(option, value) => option.ID === value.ID || {}} onChange={onChangeEntityId}
            renderInput={(params) => <TextField {...params} label='Pilih' error={entityId.error} helperText={entityId.helperText} fullWidth />}
          />
        </Grid>
        <Grid item md={12}>
          <TextField label='Deskripsi' value={description.value || ''} onChange={onChangeDescription} error={description.error} helperText={description.helperText} fullWidth />
        </Grid>
        <Grid item md={12}>
          <TextField label='Tanggal Perubahan' onChange={onChangeMoveTime} type="datetime-local" error={moveTime.error} helperText={moveTime.helperText} 
          value={moveTime.value} InputLabelProps={{shrink: true}} fullWidth />
        </Grid>
        <Grid item md={12}>
          <input accept="image/*" id="icon-history-image" type="file" style={{ display: 'none' }} onChange={onChangeImage}/>
          <label htmlFor="icon-history-image">
            <Button color="primary" aria-label="upload picture" component="span" >
              <PhotoCamera /> <small>Foto</small>
              { image.error && image.helperText }
            </Button>
          </label>
        </Grid>
        {
          imageUrl != null && <Grid item md={12}>
            <img src={imageUrl} height="200" />
          </Grid>
        }

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

HistoryDetailForm.propTypes = {
  title: PropTypes.string,
  rowData: PropTypes.object,
  conditionList: PropTypes.array,
  roomList: PropTypes.array,
  onSubmitForm: PropTypes.func,
  entityMode: PropTypes.string
};

HistoryDetailForm.defaultProps = {
  conditionList: [],
  roomList: [],
};

export default memo(HistoryDetailForm);
