import React from "react";
import Loader from "../elements/Loader";
import Input from "../elements/Input";
import { addUser } from "../../auth";

export default class AddUser extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      msg: "",
      firstName: "",
      lastName: "",
      name: "",
      password: "",
      email: "",
      isAdmin: "Nie"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({
        loading: false
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleReffirstName = ref => {
    if (this._isMounted) {
      this.setState({
        firstName: ref
      });
    }
  };

  handleReflastName = ref => {
    if (this._isMounted) {
      this.setState({
        lastName: ref
      });
    }
  };

  handleRefName = ref => {
    if (this._isMounted) {
      this.setState({
        name: ref
      });
    }
  };

  handleRefPassword = ref => {
    if (this._isMounted) {
      this.setState({
        password: ref
      });
    }
  };

  handleRefEmail = ref => {
    if (this._isMounted) {
      this.setState({
        email: ref
      });
    }
  };

  handleRefIsAdmin = ref => {
    if (this._isMounted) {
      this.setState({
        isAdmin: ref.target.value === "Tak" ? 1 : 0
      });
    }
  };
  handleClick(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      isAdmin
    } = this.state;
    addUser(
      firstName,
      lastName,
      name,
      email,
      password,
      isAdmin === "Nie" ? 0 : 1
    ).then(res => {
      console.log(res);
      if (this._isMounted && typeof res.data !== "undefined") {
        this.setState({
          msg: res.data.message
        });
      }
    });
  }

  render() {
    return (
      <div className="AddUser">
        <h1>Add User</h1>
        {this.state.loading && <Loader />}
        {!this.state.loading && (
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>First Name</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleReffirstName}
                      type="text"
                      placeholder="First Name"
                      value={this.state.firstName}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Last Name</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleReflastName}
                      type="text"
                      placeholder="Last Name"
                      value={this.state.lastName}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Name</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefName}
                      type="text"
                      placeholder="Name"
                      value={this.state.name}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Password</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefPassword}
                      type="text"
                      placeholder="Password"
                      value={this.state.password}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Email</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefEmail}
                      type="text"
                      placeholder="Email"
                      value={this.state.email}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Admin</b>
                  </td>
                  <td>
                    <select
                      value={this.state.isAdmin}
                      onChange={this.handleRefIsAdmin}
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <input
                      className="btn"
                      onClick={this.handleClick}
                      type="submit"
                      value="Add"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        )}
        {this.state.msg}
      </div>
    );
  }
}
