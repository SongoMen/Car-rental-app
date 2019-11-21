import React from "react";
import { Link, NavLink } from "react-router-dom";
import { checkIfLoggedIn } from "../../auth";
import Cookies from "universal-cookie";

const styles = {
  position: "static"
};

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
          <Link to="/">
            <p> logo </p>
          </Link>
          <ul>
            <NavLink exact to="/" activeClassName="selected">
              <li>Strona główna</li>
            </NavLink>
            <NavLink to="/onas" activeClassName="selected">
              <li>O nas</li>
            </NavLink>
            <NavLink to="/samochody" activeClassName="selected">
              <li>Samochody</li>
            </NavLink>
            <NavLink to="/kontakt" activeClassName="selected">
              <li>Kontakt</li>
            </NavLink>
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
              <Link to="/dashboard">
                <h4 className="Header__user">{user}</h4>
              </Link>
            )}
          </ul>
        </div>
      )
    );
  }
}
