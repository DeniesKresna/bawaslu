/**
 *
 * Sidebar
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from "react-router-dom";

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { getUser} from './actions';
import {makeSelectUser} from './selectors';
import reducer from './reducer';
import saga from './saga';

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HelpIcon from '@material-ui/icons/Help';
import CropFreeIcon from '@material-ui/icons/CropFree';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export function Sidebar({onGetUser, user}) {
  useInjectReducer({ key: 'sidebar', reducer });
  useInjectSaga({ key: 'sidebar', saga });

  useEffect(() => {
    onGetUser();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleSettingClick = () => {
    setOpen(!open);
  }
  const handleHelpClick = () => {
    setHelpOpen(!helpOpen);
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
      <ListItem button component={Link} to="/admin/home">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/admin/inventory">
        <ListItemIcon>
          <AmpStoriesIcon />
        </ListItemIcon>
        <ListItemText primary="Master Inventaris" />
      </ListItem>
      <ListItem button component={Link} to="/admin/inventory-period">
        <ListItemIcon>
          <EventNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Inventarisasi" />
      </ListItem>
      <ListItem button component={Link} to="/admin/barcode">
        <ListItemIcon>
          <CropFreeIcon />
        </ListItemIcon>
        <ListItemText primary="Barcode" />
      </ListItem>
      { isAdmin() && <ListItem button onClick={handleSettingClick}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Pengaturan" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      }
      { isAdmin() && <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to="/admin/unit">
            <ListItemIcon>
              <DragIndicatorIcon />
            </ListItemIcon>
            <ListItemText primary="Satuan" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to="/admin/room">
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText primary="Ruang" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to="/admin/goods-type">
            <ListItemIcon>
              <EventSeatIcon />
            </ListItemIcon>
            <ListItemText primary="Tipe Barang" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to="/admin/condition">
            <ListItemIcon>
              <BrokenImageIcon />
            </ListItemIcon>
            <ListItemText primary="Kondisi" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to="/admin/period">
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Periode Invent" />
          </ListItem>
        </List>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} component={Link} to="/admin/user">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Pengguna" />
          </ListItem>
        </List>
      </Collapse>}
      <ListItem button onClick={handleHelpClick}>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="Help Desk" />
        {helpOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={helpOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link} to="/admin/survey">
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Kuesioner" />
            </ListItem>
        </List>{
        <List component="div" disablePadding>
            <ListItem button className={classes.nested} component="a" href='https://drive.google.com/file/d/1sZlWRGfjwgaa_n7qFrnPqoPZsJ4vReW1/view?usp=sharing' target="_blank">
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Manual Book" />
            </ListItem>
        </List>}
      </Collapse>
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetUser: evt => dispatch(getUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Sidebar);
