import React, { useEffect, useState } from "react";

const HideLeftbar = ({ show, children }) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = () => {
    if (!show) setRender(false);
  };

  return (
    shouldRender && (
      <div
        className="frame"
        style={{ animation: `${show ? "showLeftbar" : "hideLeftbar"} .6s` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default HideLeftbar;
