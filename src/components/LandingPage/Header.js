import React from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import Logo from "../elements/Logo";
import { checkIfLoggedIn, logout, isAdmin } from "../../auth";

export default class Header extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      logged: null,
      position: "static",
      isAdmin: false
    };
  }
  componentDidMount() {
    this._isMounted = true;
    isAdmin().then(res => {
      if (this._isMounted) {
        this.setState({
          isAdmin: res.isAdmin === "1" ? true : false
        });
      }
    });
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
                Main page{" "}
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/about" activeClassName="selected">
                About us{" "}
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/cars" activeClassName="selected">
                Cars{" "}
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/contact" activeClassName="selected">
                Contact{" "}
              </NavLink>
            </li>
            {!this.state.logged ? (
              <ul>
                <li>
                  <NavLink to="/login">
                    <button className="btn loginButton">Login</button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register">
                    <button className="btn loginButton">Register</button>
                  </NavLink>
                </li>
              </ul>
            ) : (
              <div className="Header__logged">
                <Link className="btn" to="/dashboard">
                  <h5 className="Header__user">{user}</h5>
                </Link>
                <h5 className="btn" onClick={logout}>
                  Logout
                </h5>
                {this.state.isAdmin && (
                  <Link className="btn admin" to="/admin">
                    <h5 className="Header__user admin">Admin Panel</h5>
                  </Link>
                )}
              </div>
            )}
          </ul>
        </div>
      )
    );
  }
}
