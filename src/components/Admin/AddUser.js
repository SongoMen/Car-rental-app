import React from "react";
import Loader from "../elements/Loader";
import Input from "../elements/Input";

export default class AddUser extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      section: "",
      first_name: "",
      last_name: "",
      name: "",
      password: "",
      email: "",
      isAdmin: ""
    };
    this.changeSection = this.changeSection.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
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

  handleReflast_name = ref => {
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
        isAdmin: ref
      });
    }
  };

  render() {
    return (
      <div className="AddUser">
        <h1>Dodaj użytkownika</h1>
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
                  <Input
                    handleRef={this.handleRefIsAdmin}
                    type="text"
                    placeholder="Admin"
                    value={this.state.isAdmin}
                  />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <input className="btn" type="submit" value="Dodaj" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
