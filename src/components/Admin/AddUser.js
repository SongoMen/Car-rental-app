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
      first_name: "",
      last_name: "",
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

  handleRefFirst_name = ref => {
    if (this._isMounted) {
      this.setState({
        first_name: ref
      });
    }
  };

  handleRefLast_name = ref => {
    if (this._isMounted) {
      this.setState({
        last_name: ref
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
      first_name,
      last_name,
      name,
      email,
      password,
      isAdmin
    } = this.state;
    addUser(
      first_name,
      last_name,
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
        <h1>Dodaj użytkownika</h1>
        {this.state.loading && <Loader />}
        {!this.state.loading && (
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>Imię</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefFirst_name}
                      type="text"
                      placeholder="Imię"
                      value={this.state.first_name}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Nazwisko</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefLast_name}
                      type="text"
                      placeholder="Nazwisko"
                      value={this.state.last_name}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Nazwa użytkownika</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefName}
                      type="text"
                      placeholder="Nazwa użytkownika"
                      value={this.state.name}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Hasło</b>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefPassword}
                      type="text"
                      placeholder="Hasło"
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
                      <option>Tak</option>
                      <option>Nie</option>
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
                      value="Dodaj"
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
