import React from "react";
import { logout } from "../../auth";
import { connect } from "react-redux";
import { changeLeftBar } from "../../actions/actions";
import Leftbar from "./Leftbar";
import HideLeftbar from "./HideLeftbar";
import Input from "../elements/Input";

let status = true;

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeLeftBar: () => dispatch(changeLeftBar(status))
});

class Cars extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.leftBarChange = this.leftBarChange.bind(this);
  }

  leftBarChange() {
    status = this.props.leftbar ? false : true;
    this.props.changeLeftBar();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogout() {
    logout();
  }

  handleRefBrand = ref => {
    this.setState({
      password: ref
    });
  };

  render() {
    return (
      <div className="Cars">
        <button onClick={this.leftBarChange}>dsadsa</button>
        <div className="Cars__filetrs">
          <Input type="text" name="name" handleRef={this.handleRefBrand} />
        </div>
        <HideLeftbar show={this.props.leftbar}>
          <Leftbar />
        </HideLeftbar>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cars);
