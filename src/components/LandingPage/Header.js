import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { checkIfLoggedIn } from "../../auth";
import Cookies from "universal-cookie";

function Header() {
  let isMounted = false;
  const [logged, setUser] = useState(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    if (isMounted) {
      setUser(checkIfLoggedIn());
    }
    return () => {
      isMounted = false;
    };
  }, []);
  const cookies = new Cookies();

  let user = cookies.get("name");
  return (
    logged !== null && (
      <div className="Header">
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
          {!logged ? (
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

export default Header;
