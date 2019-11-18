import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { checkIfLoggedIn } from "../../auth";
import Cookies from "universal-cookie";

const Header = () => {
  let isMounted = "";
  const [logged, setUser] = useState(null);
  function userCheck() {
    setUser(checkIfLoggedIn());
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    if (isMounted) {
      userCheck();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  const cookies = new Cookies();

  let user = cookies.get("name");
  return (
    <div className="Header">
      <Link to="/">
        <p> logo </p>
      </Link>
      <ul>
        <NavLink to="/" activeClassName="selected">
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
          <h2 className="Header__user">{user}</h2>
        )}
      </ul>
    </div>
  );
};

export default Header;
