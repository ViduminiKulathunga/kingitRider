import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import HomeLogo from "../../images/logo.jpeg";
import HomeBanner from "../../images/banner/banner1.jpg";
import "./Home.css";
import "./Neo.css";
//MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadThis,
  titleSide: {
    fontFamily: "NanumMyeongjo-Regular",
    fontSize: "1.8em",
    color: "#FFF",
  },
  titlePckage: {
    fontFamily: "Cinzel-Regular",
    color: "#FFF",
  },
  contentPackage: {
    fontFamily: "CormorantGaramond-Regular",
    color: "#FFF",
  },
  italics: {
    fontStyle: "italic",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    display: "inline-block",
    //backgroundColor: "#002039",
    background:
      "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(11,60,73,1) 73%, rgba(3,112,139,1) 100%);",
    color: "#fff",
    width: "100%",
    minHeight: "100%",
    marginRight: "1%",
    marginBottom: "1%",
    position: "relative",
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
                  <span className={classes.italics}>Knight Rider Cabs</span>
                </Typography>
                <Typography variant="h5" noWrap className={classes.titleSide}>
                  <span className={classes.italics}>
                    We always Care for you...
                  </span>
                </Typography>
              </Grid>
              <Grid item sm className="logo-home-grid">
                <img src={HomeLogo} alt="HomeLogo" className="logo-home" />
              </Grid>
              <Grid item sm>
                <Typography variant="h5" noWrap className={classes.titleSide}>
                  <span className={classes.italics}>
                    Safe Drive Taxi Rides..
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="home-content-wrapper">
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={3}>
                <Grid key="budget" item className="homeCar">
                  <Paper className="paperss">
                    <div className="Content Wrapper">
                      <Typography
                        variant="h5"
                        noWrap
                        className={classes.titleSide}
                      >
                        <span className={classes.titlePckage}>Budget</span>
                      </Typography>
                      <div className="package-image-alto"></div>
                      <div className="text-content">
                        <Typography className={classes.titlePckage}>4 Passengers</Typography>
                        <Typography className={classes.titlePckage}>Air Conditioned</Typography>
                        <Typography className={classes.titlePckage}>Limited Baggage</Typography>
                      </div>
                    </div>
                  </Paper>
                </Grid>

                <Grid key="car" item className="homeCar">
                  <Paper className="paperss">
                    <div className="Content Wrapper">
                      <Typography
                        variant="h5"
                        noWrap
                        className={classes.titleSide}
                      >
                        <span className={classes.titlePckage}>Car</span>
                      </Typography>
                      <div className="package-image-corolla"></div>
                      <div className="text-content">
                        <Typography className={classes.titlePckage}>3 Passengers</Typography>
                        <Typography className={classes.titlePckage}>Air Conditioned</Typography>
                        <Typography className={classes.titlePckage}>Limited Baggage</Typography>
                      </div>
                    </div>
                  </Paper>
                </Grid>

                <Grid key="premier" item className="homeCar">
                  <Paper className="paperss">
                    <div className="Content Wrapper">
                      <Typography
                        variant="h5"
                        noWrap
                        className={classes.titleSide}
                      >
                        <span className={classes.titlePckage}>Premium</span>
                      </Typography>
                      <div className="package-image-audi"></div>
                      <div className="text-content">
                        <Typography className={classes.titlePckage}>3 Passengers</Typography>
                        <Typography className={classes.titlePckage}>Air Conditioned</Typography>
                        <Typography className={classes.titlePckage}>Limited Baggage</Typography>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
