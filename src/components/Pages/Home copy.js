import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import HomeLogo from "../../images/logo.jpeg";
import HomeBanner from "../../images/banner/banner1.jpg";
import "./Home.css";
import "./Neo.css";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadThis,
  titleSide: {
    fontFamily: "NanumMyeongjo-Regular",
    fontSize: "1.8em",
    color: "#FFF",
    fontStyle: "italic",
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className="home-header-wrapper">
          <div className="banner-container">
            {/* <img src={HomeBanner} alt="HomeBanner" className="banner-home" /> */}
            <div className="banner-img"> </div>
          </div>
          <div className="logo-container">
            <Grid container alignItems="center" justify="center">
              <Grid item sm>
                <Typography variant="h5" noWrap className={classes.titleSide}>
                  Knight Rider Cabs
                </Typography>
                <Typography variant="h5" noWrap className={classes.titleSide}>
                💕 We always Care for you... 💕
                </Typography>
              </Grid>
              <Grid item sm className="logo-home-grid">
                <img src={HomeLogo} alt="HomeLogo" className="logo-home" />
              </Grid>
              <Grid item sm>
                <Typography variant="h5" noWrap className={classes.titleSide}>
                  Safe Drive Taxi Rides.. 💕
                </Typography>
                <p href="#" className="btn">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Ayya Boole
                </p>
              </Grid>
            </Grid>
          </div>
        </div>
      </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
