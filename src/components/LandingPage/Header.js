import React from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import Logo from "../elements/Logo";
import { checkIfLoggedIn, logout } from "../../auth";

export default class Header extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      logged: null,
      position: "static"
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) this.setState({ logged: checkIfLoggedIn() });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const cookies = new Cookies();
    let user = cookies.get("name");
    return (
      this.state.logged !== null && (
        <div
          className="Header"
          id="header"
          style={{ position: this.state.position }}
        >
          <Logo />
          <ul>
            <li>
              {" "}
              <NavLink exact to="/" activeClassName="selected">
                Strona główna{" "}
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/onas" activeClassName="selected">
                O nas{" "}
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/samochody" activeClassName="selected">
                Samochody{" "}
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/kontakt" activeClassName="selected">
                Kontakt{" "}
              </NavLink>
            </li>
            {!this.state.logged ? (
              <ul>
                <li>
                  <NavLink to="/login">
                    <button className="btn loginButton">Zaloguj się</button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register">
                    <button className="btn loginButton">Zarejestruj się</button>
                  </NavLink>
                </li>
              </ul>
            ) : (
              <div className="Header__logged">
                <Link to="/dashboard">
                  <h4 className="Header__user">{user}</h4>
                </Link>
                <h4 className="Header__logout" onClick={logout}>
                  Logout
                </h4>
              </div>
            )}
          </ul>
        </div>
      )
    );
  }
}
