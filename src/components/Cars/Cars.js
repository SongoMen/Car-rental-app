import React from "react";
import Header from "../LandingPage/Header";
import { logout } from "../../auth";

export default class Cars extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogout() {
    logout();
  }

  render() {
    return (
      <div className="Cars">
        <Header />
        <button>dsadsa</button>
      </div>
    );
  }
}
