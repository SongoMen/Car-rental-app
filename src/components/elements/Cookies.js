import React, {useState} from "react";
import Cookies from "universal-cookie";

import {ReactComponent as CookieIcon} from "../../icons/cookie.svg";

const CookiesNotification = () => {
  let render = true;
  const cookies = new Cookies();
  const [show, setShow] = useState(true);
  function save() {
    cookies.set("cookies", true, {
      path: "/",
      expires: new Date(Date.now() + 1000000000),
    });
    render = false;
    setShow(false);
  }

  return (
    !cookies.get("cookies") &&
    show && (
      <div className="Cookies">
        <CookieIcon />
        <h4>This site is using cookies.</h4>
        <button className="btn" onClick={() => save()}>
          Accept
        </button>
      </div>
    )
  );
};

export default CookiesNotification;
