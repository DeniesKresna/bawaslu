/**
 *
 * UnitPage
 *
 */

import React, { useEffect, useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _, { debounce } from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectData, makeSelectSearch, makeSelectRow } from './selectors';
import { makeSelectUser } from '../LoginPage/selectors';
import { changeSearch, changeData, changeRow, getData, deleteRow, getRow, surveyRow } from './actions';
import reducer from './reducer';
import saga from './saga';
import loginReducer from '../LoginPage/reducer';
import loginSaga from '../LoginPage/saga'

import { normalizeData } from '../../utils/helpers';
import CommonTable from '../../components/CommonTable';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './style.css';

export function SurveyPage({ user, data, surveyRow, search, onGetData, onGetRow, onChangeSearch, onChangeData, onChangeRow, onDeleteRow }) {
  useInjectReducer({ key: 'surveyPage', reducer });
  useInjectSaga({ key: 'surveyPage', saga });
  useInjectReducer({ key: 'loginPage', reducer: loginReducer });
  useInjectSaga({ key: 'loginPage', saga: loginSaga });
  const entity = "Kuesioner";

  const delayedGetData = useCallback(debounce(onGetData, 2000), []); 
  useEffect(() => {
    onGetRow();
    onGetData();
  }, []);

  const [dialogStatus, setDialogStatus] = useState(false);
  const [entityMode, setEntityMode] = useState('create');
  const [form, setForm] = useState(surveyRow);

  const tableData = normalizeData(data);
  const columnViewed = ['Number','easyUse','easyHelp','faster','easyData','input','updater','operation'];

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
    }else{
      setDialogStatus(true);
    }
  }

  const handleChangeEasyUse = (event)=>{
    let formData = {...form}
    formData.easyUse = event.target.value
    setForm(formData);
  }

  const handleChangeEasyHelp = (event)=>{
    let formData = {...form}
    formData.easyHelp = event.target.value
    setForm(formData);
  }

  const handleChangeFaster= (event)=>{
    let formData = {...form}
    formData.faster = event.target.value
    setForm(formData);
  }

  const handleChangeEasyData = (event)=>{
    let formData = {...form}
    formData.easyData = event.target.value
    setForm(formData);
  }

  const handleChangeInput= (event)=>{
    let formData = {...form}
    formData.input = event.target.value
    setForm(formData);
  }

  const onSubmitForm = ()=>{
    let formData = {};
    formData.easy_use = parseInt(form.easyUse);
    formData.easy_help = parseInt(form.easyHelp);
    formData.faster = parseInt(form.faster);
    formData.easy_data = parseInt(form.easyData);
    formData.input = form.input;
    onChangeRow(formData);
  }

  const isAdmin = () => {
    if(user.Role != undefined){
      if(user.Role.name == 'administrator'){
        return true;
      }
    }
    return false;
  }

  return (
    <div>
      <Helmet>
        <title>{entity}</title>
        <meta name="description" content="Kuesioner Aplikasi" />
      </Helmet>
      <h1>Kuesioner</h1>

      <p>Jawab pertanyaan singkat di halaman ini untuk membantu kami meningkatkan pelayanan kami.</p>

      <Grid container>
          <Grid item md={6}>
              <h3>1. Apakah aplikasi yang dibuat dapat mudah digunakan oleh pengguna?</h3>
          </Grid>
          <Grid item md={6}>
            <RadioGroup aria-label="easyUse" name="easyUse" value={form.easyUse? form.easyUse:0} onChange={handleChangeEasyUse}>
              <FormControlLabel value="1" control={<Radio />} label="Tidak Setuju" />
              <FormControlLabel value="2" control={<Radio />} label="Kurang Setuju" />
              <FormControlLabel value="3" control={<Radio />} label="Setuju" />
              <FormControlLabel value="4" control={<Radio />} label="Sangat Setuju" />
            </RadioGroup>
          </Grid>
      </Grid>
      <Grid container>
          <Grid item md={6}>
              <h3>2. Apakah aplikasi yang telah dibuat dapat memudahkan kinerja pegawai?</h3>
          </Grid>
          <Grid item md={6}>
            <RadioGroup aria-label="easyHelp" name="easyUse" value={form.easyHelp? form.easyHelp:0} onChange={handleChangeEasyHelp}>
              <FormControlLabel value="1" control={<Radio />} label="Tidak Setuju" />
              <FormControlLabel value="2" control={<Radio />} label="Kurang Setuju" />
              <FormControlLabel value="3" control={<Radio />} label="Setuju" />
              <FormControlLabel value="4" control={<Radio />} label="Sangat Setuju" />
            </RadioGroup>
          </Grid>
      </Grid>
      <Grid container>
          <Grid item md={6}>
              <h3>3. Apakah aplikasi yang telah dibuat dapat mempercepat inventarisasi BMN?</h3>
          </Grid>
          <Grid item md={6}>
            <RadioGroup aria-label="faster" name="faster" value={form.faster? form.faster:0} onChange={handleChangeFaster}>
              <FormControlLabel value="1" control={<Radio />} label="Tidak Setuju" />
              <FormControlLabel value="2" control={<Radio />} label="Kurang Setuju" />
              <FormControlLabel value="3" control={<Radio />} label="Setuju" />
              <FormControlLabel value="4" control={<Radio />} label="Sangat Setuju" />
            </RadioGroup>
          </Grid>
      </Grid>
      <Grid container>
          <Grid item md={6}>
              <h3>4. Apakah dengan aplikasi yang telah dibuat data BMN dapat terdata dengan baik?</h3>
          </Grid>
          <Grid item md={6}>
            <RadioGroup aria-label="easyData" name="easyData" value={form.easyData? form.easyData:0} onChange={handleChangeEasyData}>
              <FormControlLabel value="1" control={<Radio />} label="Tidak Setuju" />
              <FormControlLabel value="2" control={<Radio />} label="Kurang Setuju" />
              <FormControlLabel value="3" control={<Radio />} label="Setuju" />
              <FormControlLabel value="4" control={<Radio />} label="Sangat Setuju" />
            </RadioGroup>
          </Grid>
      </Grid>
      <Grid container>
          <Grid item md={12}>
              <h3>Berikan Saran / Masukkan untuk Aplikasi ini</h3>
          </Grid>
          <Grid item md={12}>
            <TextField value={form.input? form.input:""} onChange={handleChangeInput} multiline rows={3} fullWidth={true} />
          </Grid>
      </Grid>
      <Grid container style={{marginBottom: "30px", marginTop:"10px"}} onClick={onSubmitForm}>
          <Grid item md={12}>
              <Button
                variant="contained"
                color="secondary">Kirim</Button>
          </Grid>
      </Grid>
      
      {isAdmin() &&
      <CommonTable
        search={search}
        tableData={tableData}
        canBeCreate={false}
        canBeUpdate={false}
        canBeDelete={true}
        onChangeSearch={changeSearch}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onChangePage={handleChangePage}
        onOperationClick={handleClickOperation}
        columns={columnViewed} 
        />
      }

    </div>
  );
}

SurveyPage.propTypes = {
  data: PropTypes.object,
  search: PropTypes.string,
  onGetData: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangeData: PropTypes.func,
  onChangeRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  search: makeSelectSearch(),
  user: makeSelectUser(),
  surveyRow: makeSelectRow()
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeSearch: payload => dispatch(changeSearch(payload)),
    onChangeData: payload => dispatch(changeData(payload)),
    onChangeRow: payload => dispatch(changeRow(payload)),
    onGetData: evt => dispatch(getData()),
    onGetRow: evt => dispatch(getRow()),
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
)(SurveyPage);
