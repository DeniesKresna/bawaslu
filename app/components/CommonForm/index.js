/**
 *
 * CommonForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoIcon from '@material-ui/icons/Photo';

import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { withStyles } from '@material-ui/core/styles';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const StyledGrid = withStyles((theme) => ({
  root: {
    marginTop: 15
  }
}))(Grid);

const renderInput = inp => {
  switch(inp.type){
    case 'text': return (
      <StyledGrid item xs={12} key={inp.label}>
        <TextField fullWidth value={data[inp.attribute]} onChange={(event)=>{formData[inp.attribute] = event.target.value}} label={inp.label} placeholder={inp.placeholder? inp.placeholder:''}
           />
      </StyledGrid>
    );
    case 'number': return (
      <StyledGrid item xs={12} key={inp.label}>
        <TextField fullWidth value={inp.value? inp.value:''} type="number" label={inp.label} placeholder={inp.placeholder? inp.placeholder:''} />
      </StyledGrid>
    );
    case 'textarea': return (
      <StyledGrid item xs={12} key={inp.label}>
        <TextField  multiline minRows={2} maxRows={4} label={inp.label} fullWidth placeholder={inp.placeholder? inp.placeholder:''} />
      </StyledGrid>
    );
    case 'date': return (
      <StyledGrid item xs={12} key={inp.label}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label={inp.label}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </StyledGrid>
    );
    case 'image': return (
      <StyledGrid item xs={12} key={inp.label}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained"
            color="primary"
            startIcon={<PhotoIcon />}>
            Upload {inp.label}
          </Button>
        </label> 
      </StyledGrid>
    );
    default: return <div>No Data</div>
  }
}

function CommonForm({formComponents, formData}) {
  return (
    <div>
      <Grid container>
        {
          formComponents.map(inp=>
            renderInput(inp)
          )
        }
      </Grid>
    </div>
  );
}

CommonForm.propTypes = {
  formComponents: PropTypes.array
};

export default memo(CommonForm);
