import React, { Component, Fragment } from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

import "./Map.css";
import firebase from "../../../config/firebase";

import Dropdown from "../../Dropdown/Dropdown";
import Wrapper from "../../Wrapper/Wrapper";
import Modal from "../../Modal/Modal";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
//import Link from "@material-ui/core/Link";

import Paper from "@material-ui/core/Paper";
import MoreIcon from "@material-ui/icons/More";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

const userDefaultImageUrl = "./images/users/user-img.jpg";

const LoadingContainer = (props) => <div style={{ height: `400px` }} />;

class DriverMaps extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      selectedDriver: {},
      filteredDrivers: [],
      showingInfoWindow: false,
      activeMarker: {},
      loading: false,
      some: "",
    };

    this.onChangeHandler = this.onFilterChangeHandler.bind(this);
  }

  markers = [];

  componentDidMount() {
    this.getDriverLogsHandler();
  }

  //Fetching driver log data from Firestore and
  //Assign to the state
  getDriverLogsHandler() {
    this.setState({ loading: true });

    let ref = firebase.firestore().collection("driverlog");

    //Get real time updates from
    //firebase firestore
    ref.onSnapshot(
      (querySnapshot) => {
        let docs = querySnapshot.docs;
        let logs = [];
        docs.forEach((doc) => {
          logs.push(doc.data());
        });
        this.setState({ drivers: logs, loading: false });
      },
      //callback function of firebase
      function (error) {
        this.setState({ loading: false });
        console.log("ERROR: ", error);
      }
    );
  }

  //On Filtering dropdown value change
  //Current drivers data is filtered, according to the
  //filtering value
  //And filred data assign to the filteredDrivers in the state
  onFilterChangeHandler(event) {
    const { drivers } = this.state;

    let selectedValue = event.target.value;

    this.setState({
      filteredDrivers: drivers.filter(
        (driver) => !driver.status.startsWith(selectedValue)
      ),
    });
  }

  //Marker information box pop-up
  onMarkerClickHandler = (props, marker, e) => {
    this.setState({
      selectedDriver: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  //Inforation box pop-up will be dissappeared
  //when clicked on the map
  onMapClickedHandler = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  //marker icon style will be changed according to the
  //driver status
  renderMakerIcon = (status) => {
    let markerStyle;

    switch (status) {
      case "active":
        markerStyle = "./images/map/green-marker.png";
        break;
      case "login":
        markerStyle = "./images/map/blue-marker.png";
        break;
      case "hasPassenger":
        markerStyle = "./images/map/orange-marker.png";
        break;
      case "drunken":
        markerStyle = "./images/map/red-marker.png";
        break;
      default:
        markerStyle = "./images/map/map-default3.png";
    }

    return markerStyle;
  };

  render() {
    const { drivers, filteredDrivers } = this.state;

    return (
      <Wrapper>
        <Paper className="paper">
          <Modal show={this.state.loading}>Loading drivers...</Modal>
          <div>
            <Dropdown
              label="Apply Map Filters"
              onChangeFilter={this.onChangeHandler}
            />
          </div>
          <div>
            <Map
              google={this.props.google}
              zoom={10}
              initialCenter={{ lat: 6.9154546, lng: 79.842001 }}
              onClick={this.onMapClickedHandler}
              containerStyle={{
                position: "relative",
                height: "700px",
                margin: "0 2% 5%",
                width: "auto",
                padding: "0",
                left: "0",
                right: "0",
              }}
            >
              
              {drivers.map(
                (marker, i) =>
                  !filteredDrivers.includes(marker) && (
                    <Marker
                      key={i}
                      ref={(e) => {
                        if (e) this.markers[i] = e.marker;
                      }}
                      onClick={this.onMarkerClickHandler}
                      title={marker.handle}
                      name={marker.handle}
                      rfid={marker.rfid}
                      tripId={marker.tripId}
                      position={{
                        lat: marker.location.lat,
                        lng: marker.location.long,
                      }}
                      status={marker.status}
                      icon={{ url: this.renderMakerIcon(marker.status) }}
                    />
                  )
              )}

              <InfoWindow
                onOpen={this.windowHasOpened}
                onClose={this.windowHasClosed}
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div className="InforBox">
                  <image
                    src={userDefaultImageUrl}
                    className="InforBox"
                    alt="driver-image"
                  />
                  <h2>{this.state.selectedDriver.name}</h2>
                  <p>Driver Status</p>
                  <h6>{this.state.selectedDriver.status}</h6>
                  {this.state.selectedDriver.tripId !== "" ? (
                    <Fragment>
                      <p>Trip ID</p>
                      <button className="rootButton">{this.state.selectedDriver.tripId}</button>
                    </Fragment>
                  ) : null}
                </div>
              </InfoWindow>
            </Map>
          </div>
        </Paper>
      </Wrapper>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyATaZ1smo9wxJjVIC9uvKisaHeqe9zrvYU", 
  LoadingContainer: LoadingContainer,
})(DriverMaps);
