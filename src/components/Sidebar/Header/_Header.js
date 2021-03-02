import React from "react";
//MUI
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//styles
import "./Sidebar.css";
//Icons
import MenuIcon from "@material-ui/icons/Menu";

import AppIcon from "../../images/logo.jpeg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  image: {
    maxHeight: 106,
  },
  title: {
    fontFamily: "Cinzel-Regular",
    fontSize: "1.8em",
    padding: 20,
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className="toolbar">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <img src={AppIcon} alt="Logo" className={classes.image} />
        <Typography variant="h5" noWrap className={classes.title}>
          Knight Rider Cabsss
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
