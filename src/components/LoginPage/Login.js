import React from "react";

import Input from "../elements/Input";
import { login } from "../../auth";

import { ReactComponent as Fav } from "../../icons/computer.svg";
import { ReactComponent as Key } from "../../icons/key.svg";

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
    login(this.state.email, this.state.password).catch(() => {
      this.setState({
        msg: "Wrong email or password"
      });
    });
  }

  render() {
    return (
      <div className="Login">
        <div className="form">
          <div className="form__left">
            <Fav />
            <h2>Zaloguj się tutaj.</h2>
          </div>
          <div className="form__right">
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <Input
                type="text"
                name="email"
                value={this.state.email}
                handleRef={this.handleRefEmail}
              />
            </div>
            <div>
              <label htmlFor="password">Hasło</label>
              <br />
              <Input
                type="password"
                name="pass"
                value={this.state.password}
                handleRef={this.handleRefPassword}
              />
            </div>
            <button className="btn" onClick={() => this.handleLogin()}>
              <Key />
              Zaloguj się
            </button>
            <p>{this.state.msg}</p>
          </div>
        </div>
      </div>
    );
  }
}
