import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Line } from "react-chartjs-2";
import Rating from "@material-ui/lab/Rating";

//Redux
import { connect } from "react-redux";
import {
  updateUserLog,
  viewDrunkenLog,
} from "../../../redux/actions/dataActions";

//import DrunkenLog from "./DrunkenLog/DrunkenLog";
//MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import "./DrunkenLog.css";

import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import UserListItem from "./UserListItem";

const styles = (theme) => ({
  ...theme.spreadThis,
  loginWrapper: {
    textAlign: "center",
    background:
      "linear-gradient(180deg, rgba(0,14,27,1) 39%, rgba(11,60,73,1) 73%, rgba(3,112,139,1) 100%);",
    minHeight: "100vh",
    "& .MuiDialog-paper": {
      backgroundColor: "#e5f4f5",
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
  DialogSpecialHeader: {
    color: "#fff",
    marginBottom: "10px",
    backgroundColor: "#3da6ed",
  },
  resize: {
    fontSize: "14px",
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

class RowComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      createdAt: "",
      ranking: 0,
      year: "",
      month: "",
      initialSalary: 0,
      salary: 0,
      drunkenPesentage: 0,
      updateDB: false,
      defaultt: "",
      mon: "",
      open: false,
      openAlcohol: false,
    };
  }

  componentWillReceiveProps() {
    let newSalaryCalculate = 0;
    let defaultt = "";
    if (this.props.newTotalCommission) {
      newSalaryCalculate =
        this.props.initialSalary + this.props.newTotalCommission;
      defaultt = "Hello";
      console.log(this.state.defaultt, " Before set pass defaultt0");
    } else {
      newSalaryCalculate = this.props.newSalary;
    }

    let NewAlcoholPecentage = 0;
    if (this.props.NewDriverAlcoholPecentage) {
      NewAlcoholPecentage = this.props.NewDriverAlcoholPecentage;
    } else {
      NewAlcoholPecentage = this.props.drunkenPesentage;
    }

    let NewRankingCalculate = 0;
    if (this.props.newRanking == "increment") {
      let ranking = this.props.ranking + 1;
      if (ranking >= 5) {
        NewRankingCalculate = 5;
      } else {
        NewRankingCalculate = ranking;
      }
    } else if (this.props.newRanking == "decrement") {
      let ranking = this.props.ranking - 1;
      if (ranking <= 1) {
        NewRankingCalculate = 1;
      } else {
        NewRankingCalculate = ranking;
      }
    } else {
      NewRankingCalculate = this.props.ranking;
    }

    let updateDB = false;
    if (this.props.calculatingPerfom === "pass") {
      updateDB = true;
    } else {
      updateDB = false;
    }

    const newUserLog = {
      defaultt: defaultt,
      updateDB: updateDB,
      handle: this.props.handle,
      createdAt: new Date().toISOString(),
      ranking: NewRankingCalculate,
      year: this.props.yearRetrive ? this.props.yearRetrive : this.props.year,
      month: this.props.monthRetrive ? this.props.monthRetrive : "",
      initialSalary: this.props.initialSalary,
      salary: newSalaryCalculate,
      drunkenPesentage: NewAlcoholPecentage,
      mon: this.props.mon ? this.props.mon : "",
    };

    this.setState({
      defaultt: newUserLog.defaultt,
      updateDB: newUserLog.updateDB,
      handle: newUserLog.handle ? newUserLog.handle : "",
      createdAt: newUserLog.createdAt ? newUserLog.createdAt : "",
      ranking: newUserLog.ranking ? newUserLog.ranking : "",
      year: newUserLog.year ? newUserLog.year : "",
      month: newUserLog.month ? newUserLog.month : "",
      initialSalary: newUserLog.initialSalary ? newUserLog.initialSalary : "",
      salary: newUserLog.salary ? newUserLog.salary : "",
      drunkenPesentage: newUserLog.drunkenPesentage
        ? newUserLog.drunkenPesentage
        : "",
      mon: newUserLog.mon ? newUserLog.mon : "",
    });
  }

  componentDidUpdate(prevProps) {
    const userDetails = {
      handle: this.state.handle,
      createdAt: this.state.createdAt,
      ranking: this.state.ranking,
      year: this.state.year,
      month: this.state.month,
      initialSalary: this.state.initialSalary,
      salary: this.state.salary,
      drunkenPesentage: this.state.drunkenPesentage,
      role: "driver",
    };

    // console.log(this.state.updateDB, " this.state.updateDB");
    // console.log(prevProps.updateDB, " prevProps.updateDB");
    // if (this.state.updateDB) {
    //   console.log("RRRRRRRR DB SAVE");
    //   //this.props.updateUserLog(this.state.handle, userDetails);
    // }

    console.log(this.state.mon, " this.props.mon");
    console.log(prevProps.month, " prevProps.month");
    if (this.state.mon !== prevProps.month && this.state.mon !== "") {
      console.log("RRRRRRRR DB SAVE");
      this.props.updateUserLog(this.state.handle, userDetails);
      this.setState({
        mon: prevProps.month,
      });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
    let h = this.props.handle;
    let m = this.state.month !== "" ? this.state.month : this.props.month;
    let y = this.state.year !== "" ? this.state.year : this.props.year;
    //this.props.viewDrunkenLog(h, m, y);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenAlcohol = () => {
    this.setState({ openAlcohol: true });
  };

  handleCloseAlcohol = () => {
    this.setState({ openAlcohol: false });
  };

  timeNow(i) {
    var d = new Date(i),
      h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
      m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    let value = h + "." + m;
    return value;
  }

  render() {
    const {
      classes,
      member: {
        username,
        createdAt,
        year,
        month,
        handle,
        initialSalary,
        salary,
        ranking,
        drunkenPesentage,
      },
      alcoholPerMonthFromParent,
      data: {
        alcohol: { alcoholPerMonth },
      },
      UI: { loadingOffScrean, loading },
    } = this.props;
    // let actions = (
    //   <DrunkenLog
    //     handle={username}
    //     month={this.state.month !== "" ? this.state.month : month}
    //     year={this.state.year !== "" ? this.state.year : year}
    //   />
    // );

    // let ListPrint = "";
    // if (this.props.alcoholPerMonthFromParent) {
    //   console.log(alcoholPerMonthFromParent, " alcoholPerMonthFromParent");
    //   ListPrint = alcoholPerMonthFromParent.map((item, i) => {
    //     console.log(item.createdAt, " item.createdAt");
    //     //console.log(item.createdAt.substring(0, 10), " item.Date");
    //     let drunkenDate = item.createdAt.substring(0, 10);

    //     let out = new Date(item.createdAt);
    //     let drunkenTime = out.toLocaleTimeString("en-GB", {
    //       timeZone: "Asia/Colombo",
    //       hour12: true,
    //       hour: "numeric",
    //       minute: "numeric",
    //     });
    //     console.log(drunkenTime, " item.Time");

    //     <ListItem>
    //       <ListItemIcon>
    //         <FolderIcon />
    //       </ListItemIcon>
    //       <ListItemText primary={`Date: ${drunkenDate} Time: ${drunkenTime}`} />
    //     </ListItem>;
    //   });
    // }

    let ListPrint = (
      <Card
        style={{
          maxWidth: "280px",
          margin: "0 auto",
          backgroundColor: "rgb(123 226 90)",
        }}
      >
        <CardContent>
          <Typography>No Drunken Records..</Typography>
        </CardContent>
      </Card>
    );
    if (this.props.alcoholPerMonthFromParent) {
      ListPrint = (
        <Fragment>
          {alcoholPerMonthFromParent.map((item, i) => (
            //console.log(item.createdAt, " item.createdAt");
            //console.log(item.createdAt.substring(0, 10), " item.Date");
            <UserListItem
              key={item.createdAt + item.handle}
              drunkenTime={new Date(item.createdAt).toLocaleTimeString(
                "en-GB",
                {
                  timeZone: "Asia/Colombo",
                  hour12: true,
                  hour: "numeric",
                  minute: "numeric",
                }
              )}
              drunkenDate={item.createdAt.substring(0, 10)}
            />
          ))}
        </Fragment>
      );
    }

    let recent = "";

    let optionsss = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Drunken Detected Time Within a Day(0h-24h)",
              fontColor: "rgb(8 40 49)",
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Date",
            },
          },
        ],
      },
    };

    let dataa = {
      labels: [],
      datasets: [
        {
          label: "Driver Alcohol Status Chart Per Month Over Time",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          // pointBorderColor: 'rgba(75,192,192,1)',
          // pointBackgroundColor: '#fff',
          pointBorderColor: "#076060",
          pointBackgroundColor: "yellow",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
        },
      ],
    };

    dataa.labels = Array.from({ length: 31 }, (v, i) => i + 1);

    let ttime = [];
    let filteredTime = {};
    let previousKey = "";
    let x = 0.0001;
    recent = this.state.open
      ? this.props.alcoholPerMonthFromParent
        ? this.props.alcoholPerMonthFromParent.map((item, i) => {
            //<ChartComponent key={i} handle={item.handle} member={item} />
            dataa["datasets"].map((filteredPerson) => {
              ///filteredPerson.data.push(this.timeNow(item.createdAt))
              let number = item.createdAt.substring(8, 10);
              let checkDate = Number(number);
              if (previousKey !== checkDate) {
                filteredTime[`${checkDate}`] = this.timeNow(item.createdAt);
                previousKey = checkDate;
              } else {
                filteredTime[`${checkDate + x}`] = this.timeNow(item.createdAt);
                x = x + x;
              }

              console.log(
                item.createdAt,
                " time: ",
                this.timeNow(item.createdAt)
              );
            });

            let status = true;

            if (status) {
              let result = Array.from(
                { length: 31 },
                (v, i) => filteredTime[i + 1] || 0
              );
              dataa["datasets"].map((filteredPerson) => {
                //let result = Array.from({length: 10}, (v, i) => filteredTime[i + 1] || 0);
                filteredPerson.data = result;
              });
            }
          })
        : null
      : null;

    let action = (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        fullWidth
        maxWidth="sm"
        className={classes.loginWrapper}
      >
        <DialogTitle className={classes.DialogSpecialHeader}>
          Driver's Alcohol Status Log
        </DialogTitle>
        <DialogContent>
          <div>
            <Typography variant="body1" align="center">
              <button className={classes.blueShadeButton}>
                {this.props.handle}
              </button>
              <span style={{ margin: "0 3px" }}>Alcohol Status for month</span>
              <button className={classes.pinkShadeButton}>
                {this.state.month !== "" ? this.state.month : month}
              </button>
              <button className={classes.pinkShadeButton}>
                {this.state.year !== "" ? this.state.year : year}
              </button>
            </Typography>
            <Line data={dataa} options={optionsss} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );

    let actionAlcohol = (
      <Dialog
        open={this.state.openAlcohol}
        onClose={this.handleCloseAlcohol}
        fullWidth
        maxWidth="sm"
        className={classes.loginWrapper}
      >
        <DialogTitle className={classes.DialogSpecialHeader}>
          Driver's Alcohol Record
        </DialogTitle>
        <DialogContent>
          <div>
            <Typography variant="body1" align="center">
              <button className={classes.blueShadeButton}>
                {this.props.handle}
              </button>
              <span style={{ margin: "0 3px" }}>Alcohol Rocords for month</span>
              <button className={classes.pinkShadeButton}>
                {this.state.month !== "" ? this.state.month : month}
              </button>
              <button className={classes.pinkShadeButton}>
                {this.state.year !== "" ? this.state.year : year}
              </button>
            </Typography>
            <div>
              <List> {ListPrint}</List>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleCloseAlcohol}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );

    if (!this.props.card) {
   
      return (
        <tr>
          <td>{username}</td>
          <td>{initialSalary}</td>
          <td>{this.state.salary !== 0 ? this.state.salary : salary}</td>
          <td>
            <Rating
              name="read-only"
              value={this.state.ranking !== 0 ? this.state.ranking : ranking}
              readOnly
            />
          </td>
          <td onClick={this.handleOpenAlcohol} style={{ cursor: "pointer" }}>
            {this.state.drunkenPesentage !== 0
              ? this.state.drunkenPesentage
              : drunkenPesentage}
            %
          </td>
          <td>
            {" "}
            <button
              onClick={this.handleOpen}
              style={{ cursor: "pointer", padding: "5px" }}
              className="rootButton"
            >
              Drunken Log
            </button>
          </td>

          {action}
          {actionAlcohol}
        </tr>
      );
    }

    return (
      <tr>
        <td>
          <div className="card">
            <div className="card-body">
              <strong className="card-title">{username}</strong>
              <p className="card-text">
                Initial Salary {initialSalary}
                <br />
                {this.state.salary && `Salary ${this.state.salary}`}
              </p>
              <button
                onClick={this.handleOpen}
                style={{ cursor: "pointer", padding: "5px" }}
                className="rootButton"
              >
                Drunken Log
              </button>
              {action}
              {actionAlcohol}
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

RowComponent.propTypes = {
  updateUserLog: PropTypes.func.isRequired,
  viewDrunkenLog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, { updateUserLog, viewDrunkenLog })(
  withStyles(styles)(RowComponent)
);
