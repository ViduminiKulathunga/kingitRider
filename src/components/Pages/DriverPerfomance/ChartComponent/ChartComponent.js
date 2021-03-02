import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { Line } from "react-chartjs-2";

//Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const dataa = {
  labels: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ],
  datasets: [
    {
      label: "My First dataset",
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
      pointBorderColor: "#111",
      pointBackgroundColor: "yellow",
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

class ChartComponent extends Component {
  render() {
    const {
      classes,
      member: { tripId, year, handle, drunken, createdAt, month },
    } = this.props;

    return (
      <Fragment>
        <div>
          <div>
            <h2>Line Example</h2>
            <Line data={dataa} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(ChartComponent));
