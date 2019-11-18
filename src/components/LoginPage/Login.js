import React from "react";
import { Redirect } from "react-router-dom";

import Input from "../elements/Input";
import Header from "../LandingPage/Header";
import { login, checkIfLoggedIn } from "../../auth";

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
        {this.state.logged && <Redirect to="/dashboard" />}
        <Header />
        <Input type="text" name="email" handleRef={this.handleRefEmail} />
        <Input type="password" name="pass" handleRef={this.handleRefPassword} />
        <button onClick={() => login(this.state.email, this.state.password)}>
          Button
        </button>
      </div>
    );
  }
}
