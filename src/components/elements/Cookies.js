import React, { useState } from "react";
import Cookies from "universal-cookie";

import { ReactComponent as CookieIcon } from "../../icons/cookie.svg";

let render = true;

const CookiesNotification = () => {
  const cookies = new Cookies();
  const [show, setShow] = useState(true);
  function save() {
    cookies.set("cookies", true, { path: "/" });
    render = false;
    setShow(false);
  }

  return (
    !cookies.get("cookies") &&
    show && (
      <div className="Cookies">
        <CookieIcon />
        <h4>Ta strona używa ciasteczek.</h4>
        <button className="btn" onClick={() => save()}>
          Akceptuję
        </button>
      </div>
    )
  );
};

export default CookiesNotification;
