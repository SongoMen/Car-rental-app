import React from "react";

import Loader from "../elements/Loader";
import Header from "./Header";
import Banner from "./Banner";
import HowTo from "./HowTo";
import CookiesNotification from "../elements/Cookies";

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="LandingPage">
        <Header />
        <Banner />
        <HowTo />
        <CookiesNotification />
      </div>
    );
  }
}
