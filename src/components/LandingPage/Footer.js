import React from "react";
import { Link } from "react-router-dom";

import Logo from "../elements/Logo";

const Footer = () => {
  return (
    <div className="Footer">
      <Logo />
      <div className="Footer__col">
        <ul>
          <li>
            <Link to="/onas">O nas</Link>
          </li>
          <li>
            <Link to="/Kontakt">Kontakt</Link>
          </li>
        </ul>
      </div>
      &copy; 2019
      <img src={require("../../icons/footerbg.png")} alt="bg" />
    </div>
  );
};

export default Footer;
