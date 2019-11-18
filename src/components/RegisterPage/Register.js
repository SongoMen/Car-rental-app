import React from "react";
import Input from "../elements/Input";
import Header from "../LandingPage/Header";

export default class Register extends React.Component {
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

  render() {
    return (
      <div className="Login">
        <Header />
        <form>
          <Input type="text" name="email" handleRef={this.handleRefEmail} />
          <Input
            type="password"
            name="pass"
            handleRef={this.handleRefPassword}
          />
        </form>
      </div>
    );
  }
}
