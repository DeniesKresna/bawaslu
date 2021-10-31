/**
 *
 * Sidebar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from "react-router-dom";

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSidebar from './selectors';
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

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export function Sidebar() {
  useInjectReducer({ key: 'sidebar', reducer });
  useInjectSaga({ key: 'sidebar', saga });

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleSettingClick = () => {
    setOpen(!open);
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
      <ListItem button onClick={handleSettingClick}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Pengaturan" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
      </Collapse>
      <ListItem button>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="Help Desk" />
      </ListItem>
    </div>
  );
}

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sidebar: makeSelectSidebar(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
