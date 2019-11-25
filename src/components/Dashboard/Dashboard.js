import React from "react";
import { logout, getUserInfo } from "../../auth";
import Loader from "../elements/Loader";

import { ReactComponent as Car } from "../../icons/car.svg";

let user = {
  first_name: "",
  last_name: "",
  email: "",
  name: "",
  created: ""
};

export default class Dashboard extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    getUserInfo()
      .then(res => {
        console.log(res);
        user.created = res.created;
        user.first_name = res.first_name;
        user.last_name = res.last_name;
        user.email = res.email;
        user.name = res.name;
      })
      .then(() => {
        if (this._isMounted) {
          this.setState({ loading: false });
        }
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogout() {
    logout();
  }

  render() {
    const { first_name, last_name, name, created, email } = user;
    return (
      <div className="Dashboard">
        {this.state.loading ? (
          <Loader />
        ) : (
          <div className="Dashboard__content">
            <div className="Dashboard__info">
              <h1>Panel Główny</h1>
            </div>
            <div className="Dashboard__cars">
              <div className="Dashboard__title">
                <Car />
                <h4>Lista twoich zamówień:</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
