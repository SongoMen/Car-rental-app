import React, { useEffect, useState } from "react";

const DisplayCars = ({ show, children }) => {
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
        className="frameCars"
        style={{ animation: `${show ? "show" : "hideLeftbar"} .6s` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
};

export default DisplayCars;
