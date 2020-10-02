import React from "react";

import Banner from "./Banner";
import HowTo from "./HowTo";
import CookiesNotification from "../elements/Cookies";
import CarBrands from "./CarBrands";

export default class LandingPage extends React.Component {
  render() {
    document.title = "CarBook";
    return (
      <div className="LandingPage">
        <Banner />
        <HowTo />
        <CarBrands />
        <CookiesNotification />
      </div>
    );
  }
}
