import React, { Component } from "react";

class Wrapper extends Component {
  state = {};
  render() {
    return this.props.children;
  }
}

export default Wrapper;
