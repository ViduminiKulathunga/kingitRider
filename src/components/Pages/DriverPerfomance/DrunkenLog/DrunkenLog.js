import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../../../util/MyButton";
import { Line } from "react-chartjs-2";

//Redux Stuff
import { connect } from "react-redux";
import { viewDrunkenLog } from "../../../../redux/actions/dataActions";
//MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

import ChartComponent from "../ChartComponent/ChartComponent";

import "./DrunkenLog.css";

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

export class DrunkenLog extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
    let h = this.props.handle;
    let m = this.props.month;
    let y = this.props.year;
    this.props.viewDrunkenLog(h, m, y);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  timeNow(i) {
    var d = new Date(i),
      h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
      m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    let value = h + "." + m;
    return value;
  }

  componentDidMount() {}

  render() {
    const {
      classes,
      data: {
        alcohol: { alcoholPerMonth },
      },
      UI: { loading },
    } = this.props;

    let recent = "";
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
    recent = this.state.open ? (
      !loading ? (
        alcoholPerMonth.map((item, i) => {
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
      ) : (
        <p>Loading...</p>
      )
    ) : null;

    // dataa["datasets"].forEach((filteredPerson) =>
    //   ttime.push(filteredPerson.data)
    // );
    //console.log(ttime);

    return (
      <Fragment>
        <button
          onClick={this.handleOpen}
          style={{ cursor: "pointer", padding: "5px" }}
          className="rootButton"
        >
          Drunken Log
        </button>

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
                <span style={{ margin: "0 3px" }}>
                  Alcohol Status for month
                </span>
                <button className={classes.pinkShadeButton}>
                  {this.props.month}
                </button>
                <button className={classes.pinkShadeButton}>
                  {this.props.year}
                </button>
              </Typography>
              <Line data={dataa} />
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
      </Fragment>
    );
  }
}

DrunkenLog.propTypes = {
  viewDrunkenLog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

export default connect(mapStatetoProps, { viewDrunkenLog })(
  withStyles(styles)(DrunkenLog)
);
