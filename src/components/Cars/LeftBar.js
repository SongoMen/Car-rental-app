import React from "react";

export default class Cars extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      loading: false,
      password: "",
      email: ""
    };
  }

  render() {
    return (
      <div className="Leftbar">
        <button>dsadsa</button>
      </div>
    );
  }
}
