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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser, makeSelectMessage, makeSelectLoading } from './selectors';
import { getUser } from './actions';
import reducer from './reducer';
import saga from './saga';

import { serverBaseUrl } from '../../utils/api';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      <br />
      {'Copyright © '}
      <Link color="inherit" href="https://yogyakarta.bawaslu.go.id">
        Bawaslu DIY
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export function LoginPage({ onGetUser, message, isLoading }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const entity = "Login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //onGetUser();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    };

    onGetUser(payload)
  };

  return (
    <div>
      <Helmet>
        <title>{entity}</title>
        <meta name="description" content="Pengaturan Barang Inventaris" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
          >
            <img src={serverBaseUrl + "medias?path=Assets/logo.jpeg"}/>
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={ (event) => setEmail(event.target.value) }
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={ (event) => setPassword(event.target.value) }
                />
                {/*<FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />*/}
                <Button
                  disabled={email.length <= 3 || password.length <= 3 }
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Masalah Akun? Hubungi administrator
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>

    </div>
  );
}

LoginPage.propTypes = {
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  onGetUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  message: makeSelectMessage(),
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetUser: payload => dispatch(getUser(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
