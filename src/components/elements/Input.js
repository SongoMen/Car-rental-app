import React from "react";

export default function Input(props) {
  const childRef = React.useRef(null);

  React.useEffect(() => {
    props.handleRef(childRef.current.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <input
      className="input"
      onChange={() => props.handleRef(childRef.current.value)}
      ref={childRef}
      type={props.type}
      name={props.name}
      value={props.value ? props.value : ""}
      placeholder={props.placeholder ? props.placeholder : ""}
      required
    />
  );
}
