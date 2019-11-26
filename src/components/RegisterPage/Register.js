import React from "react";

import Input from "../elements/Input";
import { register } from "../../auth";

import { ReactComponent as Rocket } from "../../icons/rocket.svg";
import { ReactComponent as Play } from "../../icons/play.svg";

export default class Register extends React.Component {
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

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
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

  handleRefFirstName = ref => {
    this.setState({
      first_name: ref
    });
  };

  handleRefLastName = ref => {
    this.setState({
      last_name: ref
    });
  };

  handleRefName = ref => {
    this.setState({
      name: ref
    });
  };

  handleRegister() {
    const { first_name, last_name, name, email, password } = this.state;
    const regex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (regex.test(email)) {
      if (
        first_name.length > 0 &&
        last_name.length > 0 &&
        name.length > 0 &&
        password.length > 0
      ) {
        register(
          this.state.first_name,
          this.state.last_name,
          this.state.name,
          this.state.email,
          this.state.password
        ).then(res => {
          if (this._isMounted) {
            this.setState({ msg: res.data.message });
          }
        });
      } else {
        if (this._isMounted) {
          this.setState({ msg: "Uzupełnij wszystkie pola." });
        }
      }
    } else {
      if (this._isMounted) {
        this.setState({ msg: "Podałeś zły email." });
      }
    }
  }

  render() {
    return (
      <div className="Login">
        <div className="form">
          <div className="form__left">
            <Rocket />
            <h2>Załóż konto</h2>
          </div>
          <div className="form__right">
            <div>
              <label htmlFor="first_name">Imię</label>
              <br />
              <Input
                type="text"
                name="first_name"
                handleRef={this.handleRefFirstName}
                value={this.state.first_name}
              />
            </div>
            <div>
              <label htmlFor="last_name">Nazwisko</label>
              <br />
              <Input
                type="text"
                name="last_name"
                handleRef={this.handleRefLastName}
                value={this.state.last_name}
              />
            </div>
            <div>
              <label htmlFor="name">Nazwa użytkownika</label>
              <br />
              <Input
                type="text"
                name="name"
                handleRef={this.handleRefName}
                value={this.state.name}
              />
            </div>
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
            <button className="btn" onClick={() => this.handleRegister()}>
              <Play />
              Zarejestruj się
            </button>
            <p>{this.state.msg}</p>
          </div>
        </div>
      </div>
    );
  }
}
