/**
 *
 * LayoutDashboard
 *
 */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectNotifStatus, makeSelectLoading } from './selectors';
import { changeNotifStatus, changePassword } from './actions';
import reducer from './reducer';
import saga from './saga';

import history from '../../../utils/history';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Sidebar from '../Sidebar';
import { Logout } from 'mdi-material-ui';

function Copyright() {
  return (
    <Typography variant="body2" align="center">
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    maxHeight: 1000,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export function LayoutDashboard({ children, notifStatus, isLoading, onNotifChange, onChangePassword }) {
  useInjectReducer({ key: 'layoutDashboard', reducer });
  useInjectSaga({ key: 'layoutDashboard', saga });

  const classes = useStyles();
  const [dialogPasswordStatus, setDialogPasswordStatus] = useState(false);
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [oldPassword, setOldPassword] = useState({});
  const [password1, setPassword1] = useState({});
  const [password2, setPassword2] = useState({});

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleNotifClose = () => {
    onNotifChange({
      open: false,
      title: 'Sukses',
      message: '',
      color: 'success'
    });
  }

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = (event) => {
    setAnchorEl(null);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  }

  const handlePasswordClose = (md='cancel') => {
    if(md != 'cancel'){
      onChangePassword({
        old_password: oldPassword.value,
        password: password1.value
      });
    }else{
      handleAccountClose();
      setDialogPasswordStatus(false);
    }
  };

  const handlePasswordOpen = () => {
    setDialogPasswordStatus(true);
  }

  const handlePassword1Change = (event) => {
    let vl = event.target.value
    let field = {...password1}
    if(vl.length < 8){
      field.error = true;
      field.description = "password minimal 8 karakter"
    }else{
      field.error = false;
      field.description = ""
    }
    field.value = vl
    setPassword1(field)
  }

  const handlePassword2Change = (event) => {
    let vl = event.target.value
    let field = {...password2}
    if(vl != password1.value){
      field.error = true;
      field.description = "password tidak sama"
    }else{
      field.error = false;
      field.description = ""
    }
    field.value = vl
    setPassword2(field)
  }

  const handleOldPasswordChange = (event) => {
    let vl = event.target.value
    let field = {...oldPassword}
    field.value = vl
    setOldPassword(field)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={handleAccountClick}>{/*}
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>*/}
            <Badge color="secondary">
              <PersonIcon />
            </Badge>
          </IconButton>
          <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleAccountClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" onClick={()=>logout()} />
                </ListItemIcon>
                <ListItemText primary="Logout" onClick={()=>logout()} />
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <LockIcon fontSize="small" onClick={()=>handlePasswordOpen()} />
                </ListItemIcon>
                <ListItemText primary="Ganti Password" onClick={()=>handlePasswordOpen()} />
              </StyledMenuItem>
            </StyledMenu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <h3>MENU</h3>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><Sidebar /></List>
      </Drawer>
      <Snackbar open={notifStatus.open} autoHideDuration={3000} onClose={handleNotifClose}>
        <Alert onClose={handleNotifClose} severity={notifStatus.color}>
          {notifStatus.message}
        </Alert>
      </Snackbar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              { isLoading && <LinearProgress /> }
              <Paper className={fixedHeightPaper}>
                { children }
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      
      <Dialog open={dialogPasswordStatus} onClose={()=>{handlePasswordClose('cancel')}} maxWidth='lg' fullWidth={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ganti Password</DialogTitle>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid item md={12}>
              <TextField label='Password Lama' type="password" onChange={handleOldPasswordChange} error={oldPassword.error} helperText={oldPassword.description} fullWidth />
            </Grid>
            <Grid item md={12}>
              <TextField label='Password Baru' type="password" onChange={handlePassword1Change} error={password1.error} helperText={password1.description} fullWidth />
            </Grid>
            <Grid item md={12}>
              <TextField label='Konfirmasi Password' type="password" onChange={handlePassword2Change} error={password2.error} helperText={password2.description} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handlePasswordClose('cancel')}} color="secondary">
            Tutup
          </Button>
          <Button disabled={password1.description!="" || password2.description !="" || password1.value.length == 0} onClick={()=>{handlePasswordClose('submit')}} color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

LayoutDashboard.propTypes = {
  notifStatus: PropTypes.object,
  isLoading: PropTypes.bool,
  onNotifChange: PropTypes.func,
  onChangePassword: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  notifStatus: makeSelectNotifStatus(),
  isLoading: makeSelectLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    onNotifChange: payload => dispatch(changeNotifStatus(payload)),
    onChangePassword: payload => dispatch(changePassword(payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LayoutDashboard);
