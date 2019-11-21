import React from "react";
import { connect } from "react-redux";
import { changeLeftBar } from "../../actions/actions";
import Loader from "../elements/Loader";

let status;

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeLeftBar: () => dispatch(changeLeftBar(status))
});

class LeftBar extends React.Component {
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
    console.log(this.props.content.length);
    return (
      <div className="Leftbar">
        {this.props.content.length === 0 ? <Loader /> : <img />}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftBar);
