import React, { Component } from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

class Test extends Component {
  state = {
    users: {}
  }
  componentDidMount(){
    axios.get('/userss').then(res => {
      console.log(res.data);
      this.setState({
        users: res.data
      })
    }).catch(err => console.log(err));
  }
  render() {
    let recentUsersMarkup = this.state.users.user ? (
    this.state.users.user.map((data) => <p>{data.username}</p>)
    ) : <p>Loading...</p>
    return (
      <Grid container>
        <Grid item sm={12}>
          {recentUsersMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default Test;
