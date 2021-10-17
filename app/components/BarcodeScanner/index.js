import React, {useState} from 'react'
import PropTypes from 'prop-types';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import {ArrowBack} from '@material-ui/icons'
import { Link } from "react-router-dom";
import QrScan from 'react-qr-reader'

function BarcodeScanner({onHandleDetected}) {

    const [qrscan, setQrscan] = useState('No result');
    const handleScan = data => {
        if (data) {
            setQrscan(data)
            onHandleDetected(data)
        }
    }
    const handleError = err => {
    console.error(err)
    }

    return (
      <div>
            <div>
                <span>QR Scanner</span>
                
                <center>
                <div style={{marginTop:30}}>
                    <QrScan
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ height: 240, width: 320 }}
                    />
                </div>
                </center>

                <TextareaAutosize
                    style={{fontSize:18, width:320, height:100, marginTop:100}}
                    maxRows={4}
                    value={qrscan}
                />
            </div>
      </div>
    );
  }

  BarcodeScanner.propTypes = {
    onHandleDetected: PropTypes.func,
};
  
  export default BarcodeScanner;