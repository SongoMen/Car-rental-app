import React from "react";
import Header from "../LandingPage/Header";
import { logout, checkIfLoggedIn } from "../../auth";

export default class Cars extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      loading: false,
      password: "",
      email: ""
    };
  }

  handleLogout() {
    logout();
  }

  render() {
    return (
      <div className="Login">
        <img src="https://pics.clipartpng.com/midle/Blue_Bmw_320i_2013_Car_PNG_Clipart-109.png" />
      </div>
    );
  }
}
