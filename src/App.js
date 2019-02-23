import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import FlickrFeedsOp1 from "./FlickrFeedsOp1";
import FlickrFeedsOp2 from "./FlickrFeedsOp2";

class App extends Component {
  render() {
    return (
      <div>
        <FlickrFeedsOp1 />
        <FlickrFeedsOp2 />
      </div>
    );
  }
}

export default App;
