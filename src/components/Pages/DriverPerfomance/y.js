``` user: ['AA', 'BB', 'CC'] ```

This is a Child Component which has two dispatches ```this.props.updateUserLog(this.state.handle, userDetails)``` and ```this.props.viewDrunkenLog(h, m, y) ```. 
Parent component consists users array. POST request DB Update need to made for each and every user inside the child component 
```this.props.updateUserLog(this.state.handle, userDetails) ``` is DB POST request

```
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
    };
  }

  componentWillReceiveProps() {
    let newSalaryCalculate = 0;
    let defaultt = "";
    if (this.props.newTotalCommission) {
      newSalaryCalculate =
        this.props.initialSalary + this.props.newTotalCommission;
      defaultt = "Hello";
    } else {
      newSalaryCalculate = this.props.initialSalary;
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
      mon: this.props.monthRetrive ? this.props.monthRetrive : "",
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
      mon: newUserLog.month ? newUserLog.month : "",
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

    if (this.state.mon !== prevProps.month && this.state.mon !== "") {
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
          dataa["datasets"].map((filteredPerson) => {
            let number = item.createdAt.substring(8, 10);
            let checkDate = Number(number);
            if (previousKey !== checkDate) {
              filteredTime[`${checkDate}`] = this.timeNow(item.createdAt);
              previousKey = checkDate;
            } else {
              filteredTime[`${checkDate + x}`] = this.timeNow(item.createdAt);
              x = x + x;
            }
          });
          let status = true;
          if (status) {
            let result = Array.from(
              { length: 31 },
              (v, i) => filteredTime[i + 1] || 0
            );
            dataa["datasets"].map((filteredPerson) => {
              filteredPerson.data = result;
            });
          }
        })
      ) : (
        <p>Loading...</p>
      )
    ) : null;

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
    );

   
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
          <td>
            {this.state.drunkenPesentage !== 0
              ? this.state.drunkenPesentage
              : drunkenPesentage}
            %
          </td>

          <button
            onClick={this.handleOpen}
            style={{ cursor: "pointer", padding: "5px" }}
            className="rootButton"
          >
            Drunken Log
          </button>
          {action}
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

```