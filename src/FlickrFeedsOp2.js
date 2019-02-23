//---------------------------------------------------------------------------------------------------------
//Introduction: This component gets public Flickr feed and display 10 random pics based on keyword input.
//              CORS restriction of your browser is avoided by fetch-jsonp package.
//Author: Guangwei He
//Date: 23/02/2019
//Version: 0.1
//----------------------------------------------------------------------------------------------------------

import React from "react";
import fetchJsonp from "fetch-jsonp";

//Global JSONP callback function
window.handleJsonpResponse = function() {};

class FlickrFeedsOp2 extends React.Component {
  state = {
    response: null, //feed data fetched from Flickr
    loadStatus: 0, //3 status   0: No content  1: Loading   2: Loaded
    searchKeyWord: null //keyword to be searched
  };

  constructor(props) {
    super(props);
    this.arr = [];
  }

  //Get 10 random numbers between 0~19
  getTenRandomNumbers = () => {
    let randomNumber = 0;
    let arr = [];
    let i = 0;
    while (arr.length < 10 && i < 200) {
      i++;
      randomNumber = Math.floor(Math.random() * 20);
      if (arr.indexOf(randomNumber) !== -1) continue;
      arr.push(randomNumber);
    }
    return arr;
  };

  //Handle click event of the button
  handleClick = e => {
    //if no keyword input, display "no pics to show"
    if (!this.state.searchKeyWord) {
      this.setState({ loadStatus: 0 });
      return;
    }

    this.arr = this.getTenRandomNumbers();

    //JSONP callback function is included in the url
    let url =
      "https://api.flickr.com/services/feeds/photos_public.gne?tags=" +
      this.state.searchKeyWord +
      "&format=json&jsoncallback=handleJsonpResponse";

    //fetch Flickr feed
    this.setState({ loadStatus: 1 });
    fetchJsonp(url, {
      //jsonpCallback: "jsoncallback",
      jsonpCallbackFunction: "handleJsonpResponse"
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ response: json, loadStatus: 2 });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loadStatus: 0 });
      });
  };

  //Handle keyword input to be searched
  handleInputSearchKeyWord = e => {
    this.setState({ searchKeyWord: e.target.value });
  };

  render() {
    return (
      <div>
        <div style={{ fontWeight: "bold" }}>
          CORS restriction is avoided through fetch-jsonp package.
        </div>
        <input
          type="text"
          placeholder="Please input keyword"
          onChange={this.handleInputSearchKeyWord}
        />
        <button onClick={this.handleClick}>Search</button>
        <div />
        {this.state.loadStatus !== 2 ? (
          this.state.loadStatus === 0 ? (
            <h4 style={{ color: "blue" }}>No pics to show.</h4>
          ) : (
            <h4 style={{ color: "blue" }}>Loading...</h4>
          )
        ) : (
          this.arr.map(item => {
            return (
              <img
                src={this.state.response.items[item].media.m}
                key={item}
                alt=""
              />
            );
          })
        )}
        <div>----------------------------------------------</div>
      </div>
    );
  }
}

export default FlickrFeedsOp2;
