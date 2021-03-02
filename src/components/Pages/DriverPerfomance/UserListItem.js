import React, { Component, Fragment } from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WarningIcon from '@material-ui/icons/Warning';

class UserListItem extends Component {
  render() {
    return (
      <Fragment>
        <ListItem>
          <ListItemIcon>
            <WarningIcon style={{ color: "#CC0000" }}  />
          </ListItemIcon>
          <ListItemText
            primary={`Date: ${this.props.drunkenDate}`}
            secondary={` Time: ${this.props.drunkenTime}`}
          />
        </ListItem>
      </Fragment>
    );
  }
}

export default UserListItem;
