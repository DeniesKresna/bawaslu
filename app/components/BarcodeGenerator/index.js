import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import ArrowBack from '@material-ui/icons/ArrowBack'
import GetApp from '@material-ui/icons/GetApp'
import { Link } from "react-router-dom";
import QRcode from 'qrcode.react'
import Printer, { print } from 'react-pdf-print'
import ReactToPrint from "react-to-print";
import bawasluLogo from '../../images/logokecil.png'

import './style.css'

const ids = ['1']

function BarcodeGenerator({onHandleDetected, goodsTypes}) {
    const [goodsType, setGoodsType] = useState({value:null, error: false, helperText: ''});
    const [nupStart, setNupStart] = useState({value:1, error: false, helperText: ''});
    const [nupEnd, setNupEnd] = useState({value:1, error: false, helperText: ''});
    let printRef = useRef();

    const ids = ['1']

    const onChangeGoodsType = (event, newValue) => {
        const inputValue = newValue
        let field = {...goodsType}
        if(inputValue == null){
          field.error = true,
          field.helperText = "wajib diisi"
        }else{
          field.error = false,
          field.helperText = ""
        }
        field.value = inputValue
        console.log(inputValue)
        setGoodsType(field);
      }

    const onChangeNupStart = (event) => {
        const inputValue = event.target.value
        let field = {...nupStart}
        field.value = inputValue
        setNupStart(field);
    }

    const onChangeNupEnd = (event) => {
        const inputValue = event.target.value
        let field = {...nupEnd}
        field.value = inputValue
        setNupEnd(field);
    }

    const barcodeSticker = () => {
        var indents = [];
        for (var i = nupStart.value; i <= nupEnd.value; i++) {
            indents.push(
                    <Grid xs={6} item key={i} style={(i%14==0)? {marginBottom: '49px'}:{}}>
                        <Grid container style={{border: "solid 1px black"}}>
                                <Grid item xs={4}>
                                    <QRcode 
                                        value={'bawaslusamawa-' + goodsType.value.code + "-" +String(i)} 
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <div style={{display:'flex', justifyContent: 'center', marginTop:'10px'}}>
                                        <img src={bawasluLogo} height={75} />
                                    </div>
                                    <div style={{display:'flex', justifyContent: 'center', marginTop:'10px'}}>
                                        <strong>{'bawaslu-' + goodsType.value.code + "-" +String(i)} </strong>
                                    </div>
                                </Grid>
                        </Grid>
                    </Grid>
            );
        }
        return indents;
    }

    return (
      <div>
            <span>QR Generator</span>
            <Grid container spacing={3}>
                <Grid item md={3}>
                    <Autocomplete options={goodsTypes} getOptionLabel={(option) => option.name || ''} onChange={onChangeGoodsType}
                        renderInput={(params) => <TextField {...params} label='Pilih' error={goodsType.error} helperText={goodsType.helperText} fullWidth />}
                />
                </Grid>
                <Grid item md={3}>
                    <TextField type="number" label='Nup Awal' value={nupStart.value || ''} onChange={onChangeNupStart} error={nupStart.error} helperText={nupStart.helperText} fullWidth />
                </Grid>
                <Grid item md={3}>
                    <TextField type="number" label='Nup Akhir' value={nupEnd.value || ''} onChange={onChangeNupEnd} error={nupEnd.error} helperText={nupEnd.helperText} fullWidth />
                </Grid>
            </Grid>
            {goodsType.value != null && 
                <ReactToPrint
                    trigger={() => <Button style={{marginTop: '10px', marginBottom: '10px'}} variant="contained">Cetak</Button>}
                    content={() => printRef}
                />
            }
            {goodsType.value != null && 
                <div ref={(el) => (printRef = el)}>
                    <div id={ids[0]} style={{ width:'210mm', height: '297mm'}}>
                        <div style={{margin: '10px 10px'}}>
                            <Grid container spacing={3}>
                                {barcodeSticker()}
                            </Grid>
                        </div>
                    </div>
                </div>
            }
      </div>
    );
  }

  BarcodeGenerator.propTypes = {
    onHandleDetected: PropTypes.func,
    goodsTypes: PropTypes.array
};
  
  export default BarcodeGenerator;