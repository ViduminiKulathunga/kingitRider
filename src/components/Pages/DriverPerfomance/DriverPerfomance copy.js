import React, { Component, Fragment } from "react";
import "./DriverPerfomance.css";
import RowComponent from "./RowComponent";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//Redux
import { connect } from "react-redux";
import {
  getDriverPerformance,
  getDriverCommissionAlcohol,
} from "../../../redux/actions/dataActions";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    padding: "50px 20px",
    marginLeft: 20,
    fontSize: "1.1em",
    color: "#fff",
    background: "rgb(0,14,27)",
    background:
      "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(36,187,162,1) 73%, rgba(3,112,139,1) 100%)",
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "60%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  appIcon: {
    color: "rgb(202, 247, 255)",
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  pinkShadeButton: {
    background: "linear-gradient(135deg, #e60883, #FF5E3A)",
    borderRadius: "3px",
    border: "0px",
    color: "#fff",
    padding: "5px",
    fontSize: "1.15rem",
    marginRight: "5px",
  },
  blueShadeButton: {
    background: "linear-gradient(135deg, #389ffd, #7bf908)",
    borderRadius: "3px",
    border: "0px",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "1.15rem",
    marginBottom: "20px",
    color: "#000",
    cursor: "pointer",
  },
});

class DriverPerfomance extends Component {
  constructor(props = {}) {
    super(props);

    this.state = {
      cardMode: false,
      month: "",
      year: "",
      monthCheck: "",
      yearCheck: "",
      createdAt: "",
      today: "",
      start: 0,
      end: 0,
      buttonDisable: true,
      calculatingPerfom: false,
      DriverCommissionResults: {},
    };

    this._evaluateMode = this._evaluateMode.bind(this);
  }
  _evaluateMode() {
    let windowWidth = window.innerWidth;
    if (!this.state.cardMode && windowWidth <= 576) {
      this.setState({ cardMode: true });
    } else if (this.state.cardMode && windowWidth > 576) {
      this.setState({ cardMode: false });
    }
  }

  componentDidMount() {
    this.props.getDriverPerformance();
    window.addEventListener("resize", () => this._evaluateMode());
    this._evaluateMode();

    let newDate = new Date();
    let todayDate = newDate.getDate();

    let monthCheck = new Date().toLocaleString("en-us", { month: "long" });
    let yearCheck = new Date().getFullYear();

    const start = 0;
    const end = 28;

    if (todayDate > start && todayDate < end) {
      this.setState({
        buttonDisable: false,
      });
    }

    this.setState({
      start: start,
      end: end,
      monthCheck: monthCheck,
      yearCheck: yearCheck,
    });
    //this.setState({ DriverCommissionResults: DriverCommissionResults });
  }

  calculatePerformance = (event) => {
    event.preventDefault();

    let month = new Date().toLocaleString("en-us", { month: "long" });
    let year = new Date().getFullYear();

    this.props.getDriverCommissionAlcohol(month, year);
    this.setState({ calculatingPerfom: true });
    this.setState({
      buttonDisable: true,
      month: month,
      year: year,
      createdAt: new Date().toISOString(),
    });
  };

  handleChange = (event) => {
    this.setState({
      DriverCommissionResults: event.target.value,
    });
    console.log(event.target.value);
  };

  render() {
    const {
      classes,
      data: {
        drivers: { user, month, year, createdAt, alcoholStatusPrevious },
        loading,
        performance: { driverCommission, alcoholStatus },
      },
      UI: { loadingOffScrean },
    } = this.props;
    let cardMode = this.state.cardMode;

    let press = this.state.calculatingPerfom;

    let DriverCommissionResults = {};
    let DriverAlcoholPecentageResults = {};
    let DriverRankingResults = {};
    let groupalcoholStatusPrevious = "";
    let groupalcoholStatus = "";

    // let dateCovert = new Date(createdAt);
    // let monthCheck = dateCovert.toLocaleString("default", { month: "long" });
    // let yearCheck = createdAt.substring(0, 4);

    let checkTodayDateAvailability = false;
    let checkTodayDate = createdAt.substring(8, 10);
    if (checkTodayDate > this.state.start && checkTodayDate < this.state.end) {
      checkTodayDateAvailability = true;
    }

    groupalcoholStatusPrevious = alcoholStatusPrevious.reduce(function (r, a) {
      r[a.handle] = r[a.handle] || [];
      r[a.handle].push(a);
      return r;
    }, Object.create(null));

    console.log(groupalcoholStatusPrevious); //Object

    if (press) {
      let groupDriverCommission = "";

      groupDriverCommission = driverCommission.reduce(function (r, a) {
        r[a.handle] = r[a.handle] || [];
        r[a.handle].push(a);
        return r;
      }, Object.create(null));

      groupalcoholStatus = alcoholStatus.reduce(function (r, a) {
        r[a.handle] = r[a.handle] || [];
        r[a.handle].push(a);
        return r;
      }, Object.create(null));

      //let DriverCommissionResults = [];
      //console.log(groupalcoholStatus);

      for (let [key, value] of Object.entries(groupDriverCommission)) {
        //console.log(`${key}: ${value}`);
        let sum = groupDriverCommission[key]
          .map((item) => item.receivedCommision)
          .reduce((prev, curr) => prev + curr, 0);

        DriverCommissionResults[`${key}`] = sum;
        //DriverCommissionResults.push({handle:key,salary:sum});
      }
      //console.log(DriverCommissionResults);
      //console.log(groupDriverCommission);

      // Object.keys(DriverCommissionResults).forEach((e) =>
      //   console.log(`key=${e}  value=${DriverCommissionResults[e]}`)
      // );

      //Alcohol Pecentage Calculation
      for (let [key, value] of Object.entries(groupalcoholStatus)) {
        //console.log(`${key}: ${value}`);
        let countTimes = groupalcoholStatus[key].filter(function (v) {
          return true;
        }).length;
        let countTimesPecentage = ((countTimes / 30) * 100).toFixed(2);
        let rankingDecrement =
          countTimesPecentage > 50 ? "decrement" : "noChange";

        DriverAlcoholPecentageResults[`${key}`] = countTimesPecentage;
        DriverRankingResults[`${key}`] = rankingDecrement;
      }
    }

    //let recentPure = "";
    let recent = [];
    let combinedUser = {};
    let combinedUserAlcohol = {};
    let newMonthCalculationDone = false;

    if (Object.keys(DriverCommissionResults).length > 0) {
      console.log(DriverCommissionResults, " DriverCommissionResults");

      combinedUser = user.reduce(function (filtered, option) {
        var someNewValue = {
          userId: option.userId,
          username: option.username,
          createdAt: option.createdAt,
          ranking: option.ranking,
          year: option.year,
          month: option.month,
          handle: option.handle,
          initialSalary: option.initialSalary,
          salary: option.salary,
          drunkenPesentage: option.drunkenPesentage,
          newTotalCommission: false,
          newRanking: false,
        };
        filtered.push(someNewValue);

        return filtered;
      }, []);

      console.log(combinedUser, "  combinedUser");
      combinedUser.forEach((filteredPerson) => {
        let username = filteredPerson.username;

        console.log(username, filteredPerson.newTotalCommission, "  Text");
        recent.push(
          <RowComponent
            updateDB={true}
            loadingOffScrean={true}
            calculatingPerfom={this.state.calculatingPerfom ? "pass" : "did"}
            newSalary={filteredPerson.initialSalary}
            key={filteredPerson.userId}
            handle={filteredPerson.username}
            monthRetrive={this.state.month}
            yearRetrive={this.state.year}
            month={month}
            mon={this.state.month}
            year={year}
            member={filteredPerson}
            initialSalary={filteredPerson.initialSalary}
            drunkenPesentage={filteredPerson.drunkenPesentage}
            card={cardMode}
            ranking={filteredPerson.ranking}
            // newTotalCommission={
            //   filteredPerson.newTotalCommission === true
            //     ? filteredPerson.newTotalCommission
            //     : false
            // }
            // newTotalCommission={filteredPerson.newTotalCommission}
            NewDriverAlcoholPecentage={
              DriverAlcoholPecentageResults[username] === undefined
                ? "0"
                : DriverAlcoholPecentageResults[username]
            }
            newTotalCommission={
              DriverCommissionResults[username] === undefined
                ? 0
                : DriverCommissionResults[username]
            }
            newRanking={
              DriverRankingResults[username] === undefined
                ? DriverCommissionResults[username]
                  ? "increment"
                  : "noChange"
                : DriverRankingResults[username]
            }
            alcoholPerMonthFromParent={
              groupalcoholStatus[filteredPerson.username]
            }
            press={true}
            newMonthCalculationDone={true}
          />
        );
      });

      newMonthCalculationDone = true;

      // for (const [key, value] of Object.entries(DriverCommissionResults)) {
      //   recent.push(
      //     combinedUser[`${key}`].map((filteredPerson) => (
      //       <RowComponent
      //         newSalary={filteredPerson.initialSalary}
      //         key={filteredPerson.userId}
      //         handle={filteredPerson.username}
      //         monthRetrive = { month };
      //         yearRetrive = { year };
      //         member={filteredPerson}
      //         card={cardMode}
      //         newTotalCommission={filteredPerson.newTotalCommission}
      //       />
      //     ))
      //   );
      // }
    } else {
      recent = (
        <Fragment>
          {user.map((filteredPerson) => (
            <RowComponent
              updateDB={true}
              loadingOffScrean={true}
              calculatingPerfom={false}
              newSalary={filteredPerson.salary}
              key={filteredPerson.userId}
              handle={filteredPerson.username}
              month={month}
              monthRetrive={this.state.month}
              mon={this.state.month}
              year={year}
              member={filteredPerson}
              card={cardMode}
              newTotalCommission={false}
              NewDriverAlcoholPecentage={false}
              newRanking={false}
              press={true}
              newMonthCalculationDone={false}
              initialSalary={filteredPerson.initialSalary}
              drunkenPesentage={filteredPerson.drunkenPesentage}
              ranking={filteredPerson.ranking}
              alcoholPerMonthFromParent={
                groupalcoholStatusPrevious[filteredPerson.username]
              }
            />
          ))}
        </Fragment>
      );
    }

    let profileMarkup = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div>
            <AppBar
              position="static"
              style={{ backgroundColor: "#000f1c", marginBottom: "0" }}
            >
              <Toolbar>
                <div>
                  <Typography variant="h6" align="center">
                    Driver's Performance for month
                    <button className={classes.pinkShadeButton}>
                      {this.state.month !== "" ? this.state.month : month}
                    </button>
                    <button className={classes.pinkShadeButton}>
                      {this.state.year !== "" ? this.state.year : year}
                    </button>
                  </Typography>
                </div>
              </Toolbar>
              <Toolbar>
                <div>
                  <Typography variant="subtitle1" align="center">
                    Performace calcutated:
                    <button className={classes.pinkShadeButton}>
                      {this.state.createdAt !== ""
                        ? this.state.createdAt.split("T")[0]
                        : createdAt.split("T")[0]}
                    </button>
                  </Typography>
                </div>
              </Toolbar>
              <Toolbar>
                <Button
                  className={classes.blueShadeButton}
                  disabled={
                    loadingOffScrean ||
                    this.state.buttonDisable ||
                    (month == this.state.monthCheck &&
                      year == this.state.yearCheck &&
                      checkTodayDateAvailability)
                  }
                  onClick={this.calculatePerformance}
                >
                  Calculate Performance
                  {loadingOffScrean && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </Toolbar>
            </AppBar>
            <table className="table">
              {!cardMode && (
                <thead>
                  <tr>
                    <th>Handle</th>
                    <th>Initial Salary</th>
                    <th>Salary</th>
                    <th>Ranking</th>
                    <th>Drunken Presentage</th>
                    <th>Drunken Log</th>
                  </tr>
                </thead>
              )}

              <tbody>{recent}</tbody>
            </table>
          </div>
        </div>
      </Paper>
    ) : (
      <p>Loading...</p>
    );

    return <Fragment>{profileMarkup}</Fragment>;
  }
}

DriverPerfomance.propTypes = {
  getDriverPerformance: PropTypes.func.isRequired,
  getDriverCommissionAlcohol: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, {
  getDriverPerformance,
  getDriverCommissionAlcohol,
})(withStyles(styles)(DriverPerfomance));
