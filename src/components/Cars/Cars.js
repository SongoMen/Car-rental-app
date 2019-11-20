import React from "react";
import Header from "../LandingPage/Header";
import { logout } from "../../auth";
import { connect } from "react-redux";
import { changeLeftBar } from "../../actions/actions";

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
    setInterval(() => {
      console.log(this.props.leftbar);
    }, 1000);
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleLogout() {
    logout();
  }

  render() {
    return (
      <div className="Cars">
        <Header />
        <button onClick={this.leftBarChange}>dsadsa</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cars);
