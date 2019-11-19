import React from "react";

import Input from "../elements/Input";
import Header from "../LandingPage/Header";
import { login } from "../../auth";

import { ReactComponent as Fav } from "../../icons/computer.svg";

export default class Login extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      loading: false,
      password: "",
      email: "",
      logged: false
    };
  }

  handleRefPassword = ref => {
    this.setState({
      password: ref
    });
  };

  handleRefEmail = ref => {
    this.setState({
      email: ref
    });
  };

  handleLogin() {
    login(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="Login">
        <Header />
        <div className="form">
          <div className="form__left">
            <h2>Zaloguj się tutaj.</h2>
            <Fav />
          </div>
          <div className="form__right">
            <Input type="text" name="email" handleRef={this.handleRefEmail} />
            <Input
              type="password"
              name="pass"
              handleRef={this.handleRefPassword}
            />
            <button
              onClick={() => login(this.state.email, this.state.password)}
            >
              Button
            </button>
          </div>
        </div>
      </div>
    );
  }
}
