//---------------------------------------------------------------------------------------------------------
//Introduction: This component gets public Flickr feed and display 10 random pics based on keyword input.
//              CORS restriction of your browser needs to be disabled through browser extension.
//Author: Guangwei He
//Date: 23/02/2019
//Version: 0.1
//----------------------------------------------------------------------------------------------------------

import React from "react";
import axios from "axios";

class FlickrFeedsOp1 extends React.Component {
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
  handleClick = async e => {
    //if no keyword input, display "no pics to show"
    if (!this.state.searchKeyWord) {
      this.setState({ loadStatus: 0 });
      return;
    }

    this.arr = this.getTenRandomNumbers();

    //nojsoncallback=1 requies Flickr return JSON data directly
    let url =
      "https://api.flickr.com/services/feeds/photos_public.gne?tags=" +
      this.state.searchKeyWord +
      "&format=json&nojsoncallback=1";

    //fetch Flickr feed
    try {
      this.setState({ loadStatus: 1 });
      let response = await axios.get(url);
      console.log(response);
      this.setState({ response: response.data, loadStatus: 2 });
    } catch (err) {
      console.log(err);
      this.setState({ loadStatus: 0 });
    }
  };

  //Handle keyword input to be searched
  handleInputSearchKeyWord = e => {
    this.setState({ searchKeyWord: e.target.value });
  };

  render() {
    return (
      <div>
        <div style={{ fontWeight: "bold" }}>
          CORS restriction needs to be disabled by Chrome Extension.
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

export default FlickrFeedsOp1;
