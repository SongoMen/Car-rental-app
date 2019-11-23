import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="Logo">
      <h3 style={{ fontFamily: "Righteous", fontWeight: "400" }}>Samochodex</h3>
    </Link>
  );
};

export default Logo;
