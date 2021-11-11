/**
 *
 * InventoryDetailForm
 *
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
// import styled from 'styled-components';

import { dateTimeNow } from '../../../utils/helpers';
import { serverBaseUrl } from '../../../utils/api';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import Assignment from '@material-ui/icons/Assignment';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

function InventoryDetailForm({
  title, goBack, rowData, unitList, roomList, conditionList, goodsTypeList, onSubmitForm, entityMode
}) {

  let rowDataCopy = JSON.parse(JSON.stringify(rowData));

  const [name, setName] = useState({value:rowDataCopy.name, error:false, helperText:''});
  const [code, setCode] = useState({value:rowDataCopy.GoodsTypeID, error:false, helperText:''});
  const [nup, setNup] = useState({value:rowDataCopy.nup, error: false, helperText: ''});
  const [year, setYear] = useState({value:rowDataCopy.year, error: false, helperText: ''});
  const [unit, setUnit] = useState({value:rowDataCopy.UnitID, error: false, helperText: ''});
  const [quantity, setQuantity] = useState({value:rowDataCopy.quantity, error: false, helperText: ''});
  const [price, setPrice] = useState({value:rowDataCopy.price, error: false, helperText: ''});
  const [room, setRoom] = useState({value:rowDataCopy.RoomID, error: false, helperText: ''});
  const [image, setImage] = useState({value:'', error: false, helperText: ''});
  const [imageUrl, setImageUrl] = useState(rowDataCopy.imageUrl != ""?serverBaseUrl + 'medias?path=' + rowDataCopy.imageUrl:null);
  const [imageReceive, setImageReceive] = useState({value:'', error: false, helperText: ''});
  const [imageReceiveUrl, setImageReceiveUrl] = useState(null);
  const [procurementDoc, setProcurementDoc] = useState({value:'', error: false, helperText: ''});
  const [procurementDocUrl, setProcurementDocUrl] = useState(rowDataCopy.procurementDocUrl != ""?serverBaseUrl + 'ivt?path=' + rowDataCopy.procurementDocUrl:null);
  const [statusDoc, setStatusDoc] = useState({value:'', error: false, helperText: ''});
  const [statusDocUrl, setStatusDocUrl] = useState(rowDataCopy.statusDocUrl != ""?serverBaseUrl + 'ivt?path=' + rowDataCopy.statusDocUrl:null);
  const [moveDescription, setDescriptionMove] = useState({value:'', error:false, helperText: ''})
  const [moveTime, setMoveTime] = useState({value:dateTimeNow(), error:false, helperText: ''})
  const [yearList, setYearList] = useState([]);

  useEffect(()=> {
    generateYearList();
  },[])

  const generateYearList = () => {
    const dt = new Date();
    let yr = dt.getFullYear();
    let yrList = [];
    while(yr >= 1990){
      yrList.push({ID:yr, name:yr.toString()});
      yr--;
    }
    setYearList(yrList);
  }

  const handleSubmitForm = (md) => {
    let result = {}
    if(name.value != null)
      result.name = name.value
    if(code.value != null)
      result.GoodsTypeID = parseInt(code.value)
    if(nup.value != null)
      result.nup = parseInt(nup.value)
    if(year.value != null)
      result.year = parseInt(year.value)
    if(unit.value != null)
      result.UnitID = parseInt(unit.value)
    if(quantity.value != null)
      result.quantity = parseInt(quantity.value)
    if(price.value != null)
      result.price = parseInt(price.value)
    if(room.value != null)
      result.EntityID = parseInt(room.value)
      //ConditionID: parseInt(condition.value),
    if(image.value != null)
      result.image = image.value
    if(imageReceive.value != null)
      result.historyImage = imageReceive.value
    if(procurementDoc.value != null)
      result.procurementDoc = procurementDoc.value
    if(statusDoc.value != null)
      result.statusDoc = statusDoc.value
    if(moveDescription.value != null)
      result.description = moveDescription.value
    if(moveTime.value != null){
      result.history_time = moveTime.value + ":00+07:00";
    }
    if(rowData.hasOwnProperty('ID')){
      result.ID = rowData.ID
    }

    onSubmitForm(md, result)
  }

  const onChangeName = (event) => {
    const inputValue = event.target.value
    let field = {...name}
    if(inputValue.length == 0){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue
    setName(field);
  }

  const onChangeCode = (event, newValue) => {
    const inputValue = newValue
    let field = {...code}
    if(inputValue == null){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue.ID
    setCode(field)
  }

  const onChangeNup = (event) => {
    const inputValue = event.target.value
    let field = {...nup}
    if(inputValue.length == 0){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue
    setNup(field);
  }

  const onChangeYear = (event, newValue) => {
    const inputValue = newValue
    let field = {...year}
    if(inputValue == null){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue.ID
    setYear(field);
  }

  const onChangeUnit = (event, newValue) => {
    const inputValue = newValue
    let field = {...unit}
    if(inputValue == null){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue.ID
    setUnit(field);
  }

  const onChangeQuantity = (event) => {
    const inputValue = event.target.value
    let field = {...quantity}
    if(inputValue.length == 0){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue
    setQuantity(field);
  }

  const onChangePrice = (event) => {
    const inputValue = event.target.value
    let field = {...price}
    if(inputValue.length == 0){
      field.error = true,
      field.helperText = "wajib diisi"
    }else{
      field.error = false,
      field.helperText = ""
    }
    field.value = inputValue
    setPrice(field);
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
    field.value = inputValue.ID
    setRoom(field);
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

  const onChangeImageReceive = (event) => {
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
    setImageReceiveUrl(URL.createObjectURL(inputValue));
    setImageReceive(field);
  }

  const onChangeProcurementDoc = (event) => {
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
    setProcurementDocUrl(inputValue.name);
    setProcurementDoc(field);
  }

  const onChangeStatusDoc = (event) => {
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
    setStatusDocUrl(inputValue.name);
    setStatusDoc(field);
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

  const onChangeMoveDescription = (event) => {
    const inputValue = event.target.value
    let field = {...moveDescription}
    field.value = inputValue
    setDescriptionMove(field);
  }

  const findObjectById = (arr, id=null) => {
    const item = arr.find((opt)=>{
      if (opt.ID == id)
        return opt;
    })
    return item || {};
  }

  const downloadFile = async (path) => {
    try{
      const ok = await request("POST", "ivt", {path: path});
    }catch(error){
      alert(error);
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <Grid container spacing={5}>
        <Grid item md={12}>
          <TextField label='Nama' value={name.value || ''} onChange={onChangeName} error={name.error} helperText={name.helperText} fullWidth/>
        </Grid>
        <Grid item md={12}>
          <Autocomplete options={goodsTypeList} getOptionLabel={(option) => option.name || ''} value={findObjectById(goodsTypeList, code.value)}
           getOptionSelected={(option, value) => option.ID === value.ID || {}} onChange={onChangeCode}
            renderInput={(params) => <TextField {...params} label='Tipe' error={code.error} helperText={code.helperText} fullWidth />}
          />
        </Grid>
        <Grid item md={5}>
          <TextField label='NUP' value={nup.value || ''} onChange={onChangeNup} error={nup.error} helperText={nup.helperText} type="number" fullWidth />
        </Grid>
        <Grid item md={7}>
          <Autocomplete options={yearList} getOptionLabel={(option) => option.name || ''} value={findObjectById(yearList, year.value)}
           getOptionSelected={(option, value) => option.ID === value.ID || {}} onChange={onChangeYear}
            renderInput={(params) => <TextField {...params} label='Tahun' error={year.error} helperText={year.helperText} fullWidth />}
          />
        </Grid>
        <Grid item md={12}>
          <Autocomplete options={unitList} getOptionLabel={(option) => option.name || ''} value={findObjectById(unitList, unit.value)}
           getOptionSelected={(option, value) => option.ID === value.ID || {}} onChange={onChangeUnit}
            renderInput={(params) => <TextField {...params} label='Satuan' error={unit.error} helperText={unit.helperText} fullWidth />}
          />
        </Grid>
        <Grid item md={6}>
          <TextField label='Jumlah' value={quantity.value || ''} onChange={onChangeQuantity} type="number" error={quantity.error} helperText={quantity.helperText} fullWidth />
        </Grid>
        <Grid item md={6}>
          <TextField label='Harga Satuan' value={price.value || ''} onChange={onChangePrice} type="number" error={price.error} helperText={price.helperText} fullWidth />
        </Grid>
        {/* entityMode == "create" &&
          <Grid item md={12}>
            <Autocomplete options={roomList} getOptionLabel={(option) => option.name || ''} value={findObjectById(roomList, room.value)}
              getOptionSelected={(option, value) => option.ID === value.ID || {}} onChange={onChangeRoom}
                renderInput={(params) => <TextField {...params} label='Ruangan' error={room.error} helperText={room.helperText} fullWidth />}
              />
          </Grid>*/
        }
        {/* entityMode == "create" &&
          <Grid item md={12}>
            <TextField label='Tanggal Pengadaan' onChange={onChangeMoveTime} type="datetime-local" error={moveTime.error} helperText={moveTime.helperText} 
            value={moveTime.value} InputLabelProps={{shrink: true}} fullWidth />
          </Grid>*/
        }
        <Grid item md={12}>
          <input accept="image/*" id="icon-button-image" type="file" style={{ display: 'none' }} onChange={onChangeImage}/>
          <label htmlFor="icon-button-image">
            <Button color="primary" aria-label="upload picture" component="span" >
              <PhotoCamera /> <small>Foto Barang</small>
              { image.error && image.helperText }
            </Button>
          </label>
        </Grid>
        {
          (imageUrl != null) && <Grid item md={12}>
            <img src={imageUrl} height="200" />
          </Grid>
        }
        {/*entityMode == 'create' && <Grid item md={12}>
          <input accept="image/*" id="icon-button-image-receive" type="file" style={{ display: 'none' }} onChange={onChangeImageReceive}/>
          <label htmlFor="icon-button-image-receive">
            <Button color="secondary" aria-label="upload picture" component="span" >
              <PhotoCamera /> <small>Foto Penerimaan Barang</small>
              { imageReceive.error && imageReceive.helperText }
            </Button>
          </label>
        </Grid>
      */}
        {/*
          (imageReceiveUrl != null && entityMode == 'create') && <Grid item md={12}>
            <img src={imageReceiveUrl} height="200" />
          </Grid>
        */}
        <Grid item md={12}>
          <input accept="application/msword, application/pdf" id="icon-button-procurement" type="file" style={{ display: 'none' }} onChange={onChangeProcurementDoc}/>
          <label htmlFor="icon-button-procurement">
            <Button color="primary" aria-label="upload document" component="span" >
              <Assignment /> <small>Document Pengadaan</small>
              { procurementDoc.error && procurementDoc.helperText }
            </Button>
          </label>
          {procurementDocUrl && <small> <a href={serverBaseUrl + "/ivt?inventoryId=" + rowData.ID + "&docType=procurement"} target="_blank">Download</a> </small>}
        </Grid>
        <Grid item md={12}>
          <input accept="application/msword, application/pdf" id="icon-button-status" type="file" style={{ display: 'none' }} onChange={onChangeStatusDoc}/>
          <label htmlFor="icon-button-status">
            <Button color="secondary" aria-label="upload document" component="span" >
              <Assignment /> <small>Document Penetapan Status</small>
              { statusDoc.error && statusDoc.helperText }
            </Button>
          </label>
          {statusDocUrl && <small><a href={serverBaseUrl + "/ivt?inventoryId=" + rowData.ID + "&docType=status"} target="_blank">Download</a> </small>}
        </Grid>
        {/*entityMode == 'create' && <Grid item md={12}>
            <TextField label='Deskripsi Pengadaan' value={moveDescription.value || ''} onChange={onChangeMoveDescription} error={moveDescription.error} helperText={moveDescription.helperText} fullWidth/>
          </Grid>
      */}

        <Grid item md={12}>
          <Button onClick={goBack} color="secondary">
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
  title: PropTypes.string,
  goBack: PropTypes.func,
  rowData: PropTypes.object,
  tableData: PropTypes.object,
  unitList: PropTypes.array,
  conditionList: PropTypes.array,
  roomList: PropTypes.array,
  goodsTypeList: PropTypes.array,
  onSubmitForm: PropTypes.func,
  entityMode: PropTypes.string
};

InventoryDetailForm.defaultProps = {
  unitList: [],
  conditionList: [],
  roomList: [],
  goodsTypeList: []
};

export default memo(InventoryDetailForm);
