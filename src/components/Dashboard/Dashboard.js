import React from "react";
import Input from "../elements/Input";
import { logout, checkIfLoggedIn } from "../../auth";

export default class Dashboard extends React.Component {
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
      <div className="Dashboard">
        <button onClick={() => this.handleLogout()}>Button</button>
      </div>
    );
  }
}
