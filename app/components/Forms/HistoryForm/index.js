/**
 *
 * InventoryDetailForm
 *
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

function HistoryForm({
  roomList, conditionList
}) {
  const [room, setRoom] = useState({value:null, error: false, helperText: ''});
  const [condition, setCondition] = useState({value:null, error: false, helperText: ''});
  const [image, setImage] = useState({value:null, error: false, helperText: ''});
  const [imageUrl, setImageUrl] = useState({value:null, error: false, helperText: ''});

  const handleSubmitForm = (md) => {
    const result = {
      room: room.value,
      condition: condition.value,
    }
    onSubmitForm(md, result)
  }

  const onChangeRoom = (event, newValue) => {
    const inputValue = newValue
    let field = {...room}
    if(inputValue == null){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue
    setRoom(field);
  }

  const onChangeCondition = (event, newValue) => {
    const inputValue = newValue
    let field = {...condition}
    if(inputValue == null){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue
    setCondition(field);
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
    setImageUrl(URL.createObjectURL(inputValue));
    setImage(inputValue);
  }

  const findObjectById = (arr, id=null) => {
    const item = arr.find((opt)=>{
      if (opt.ID == id)
        return opt;
    })
    return item || {};
  }

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item md={6}>
          <Autocomplete options={roomList} getOptionLabel={(option) => option.name || ''} value={findObjectById(roomList, room.value)}
            getOptionSelected={(option, value) => option.ID === value.ID || {}} onChange={onChangeRoom}
              renderInput={(params) => <TextField {...params} label='Ruangan' error={room.error} helperText={room.helperText} fullWidth />}
            />
        </Grid>
        <Grid item md={6}>
          <Autocomplete options={conditionList} getOptionLabel={(option) => option.name || ''} value={findObjectById(conditionList, condition.value)}
            getOptionSelected={(option, value) => option.ID === value.ID || {}} onChange={onChangeCondition}
              renderInput={(params) => <TextField {...params} label='Kondisi' error={condition.error} helperText={condition.helperText} fullWidth />}
            />
        </Grid>
        <Grid item md={3}>
          <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }} onChange={onChangeImage}/>
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span" >
              <PhotoCamera />
              { image.error && image.helperText }
            </IconButton>
          </label>
        </Grid>
        {
          !(imageUrl == null) && <Grid item md={9}>
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

InventoryDetailForm.propTypes = {
  conditionList: PropTypes.array,
  roomList: PropTypes.array,
};

InventoryDetailForm.defaultProps = {
  conditionList: [],
  roomList: [],
};

export default memo(HistoryForm);
