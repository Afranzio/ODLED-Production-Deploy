import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';

// ToolTip
import Tooltip from '@material-ui/core/Tooltip';

// BS
import {Button, DropdownButton, Dropdown} from 'react-bootstrap';

// Logo
import Logo from '../asset/imgs/OD.jpg'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
    // background: "rgb(128,128,128,0.7)",
    background: "rgba(255, 255, 255, .5)",
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer({loggingOff, detail, user}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const buttonControl = () => {
    if (detail){
      window.location = "#/login"
    }
    else{
      window.location = "#/design"
    }
  }

  function reloadPages(){
    window.location="#/freestyle"
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })} 
        style={{background: "rgb(3,77,162)" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap style={{display: "flex", justifyContent: "space-between", width: "100%", alignSelf: "center"}}>
            <img onClick={() => {window.location = "#/home"}} alt="" width='70' style={{marginTop: "0.5em",borderRadius: "5px", marginLeft: "calc(50% - 35px)"}} src={Logo}  className="d-inline-block align-top imgLogo" />{' '}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
          </IconButton>
        </div>
        <Divider />
          <List>
            <Tooltip className="toolTip" title="Home" placement="right" >
              <ListItem className="listMenu" button key="Home" onClick={() => {window.location.reload(1)}} >
                  <ListItemIcon><HomeIcon className="leftMenu" style={{color: "rgb(3,77,162)"}} /></ListItemIcon>
                  <ListItemText primary={"Home"} />
              </ListItem>
            </Tooltip>
            <Tooltip className="toolTip" title="Support and Contact" placement="right" >
              <ListItem className="listMenu" button key="Support"  onClick={() => {window.location ="#/support"}} >
                  <ListItemIcon><ContactSupportRoundedIcon className="leftMenu" style={{color: "rgb(3,77,162)"}} /></ListItemIcon>
                  <ListItemText primary={"Support"} />
              </ListItem>
            </Tooltip>
            <Tooltip className="toolTip" title="Setting" placement="right" >
              <ListItem className="listMenu" button key="Setting"   onClick={() => {window.location ="#/setting"}} >
                  <ListItemIcon><SettingsApplicationsRoundedIcon className="leftMenu" style={{color: "rgb(3,77,162)"}} /></ListItemIcon>
                  <ListItemText primary={"Setting"} />
              </ListItem>
            </Tooltip>
            <Tooltip className="toolTip" title="Logout" placement="right" >
              <ListItem className="listMenu" button key="LogOut"  onClick={() => {loggingOff()}} >
                  <ListItemIcon><ExitToAppIcon className="leftMenu" style={{color: "rgb(3,77,162)"}} /></ListItemIcon>
                  <ListItemText primary={"LogOut"} />
              </ListItem>
            </Tooltip>
          </List>
        <Divider />
      </Drawer>
    </div>
  );
}
