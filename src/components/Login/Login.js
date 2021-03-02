import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppIcon from "../../images/logo.jpeg";
import Card from "@material-ui/core/Card";
//Redux
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.loginWrapper}
      >
        <Grid item sm />
        <Grid item sm>
          <Card className={classes.cardLogin}>
            <img src={AppIcon} alt="Logo" className={classes.imageLogin} />
            <Typography variant="h4" noWrap className={classes.loginTitle}>
              Knight Rider Cabs
            </Typography>
            <form
              noValidate
              className={classes.form}
              onSubmit={this.handleSubmit}
            >
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                InputProps={{ classes: { underline: classes.underline } }}
                InputLabelProps={{
                  className: classes.labelUnderline,
                }}
                value={this.state.email}
                onChange={this.handleChange}
                helpertext={errors.email}
                error={errors.email ? true : false}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                InputProps={{ classes: { underline: classes.underline } }}
                InputLabelProps={{
                  className: classes.labelUnderline,
                }}
                value={this.state.password}
                onChange={this.handleChange}
                helpertext={errors.password}
                error={errors.password ? true : false}
                fullWidth
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Login
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <br />
              <small className={classes.textSecondary}>
                Already Have an account ? login here...
              </small>
            </form>
          </Card>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Login));
