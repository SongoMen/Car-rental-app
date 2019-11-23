import React from "react";
import { connect } from "react-redux";
import { changeLeftBar } from "../../actions/actions";
import Loader from "../elements/Loader";

import { ReactComponent as X } from "../../icons/x.svg";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeLeftBar: () => dispatch(changeLeftBar(false))
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
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    console.log(this);
    this.props.changeLeftBar();
  }

  render() {
    return (
      <div className="Leftbar">
        {this.props.content.length === 0 ? (
          <Loader />
        ) : (
          <div className="Leftbar__content">
            <X />
          </div>
        )}
        <div className="Leftbar__content">
          <X onClick={this.handleClose} />
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftBar);
