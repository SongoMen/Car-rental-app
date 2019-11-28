import React from "react";
import Input from "../elements/Input";

export default class Contact extends React.Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      name: "",
      Surname: "",
      Email: ""
    };
  }

  handleRefName = ref => {
    if (this._isMounted) {
      this.setState({
        name: ref
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleRefSurname = ref => {
    if (this._isMounted) {
      this.setState({
        Surname: ref
      });
    }
  };

  handleRefEmail = ref => {
    if (this._isMounted) {
      this.setState({
        Email: ref
      });
    }
  };
  render() {
    document.title = "Samochodex - Kontakt";
    return (
      <div className="Contact">
        <div className="Contact__title">
          <div className="Contact__cont">
            <h1 className="hover">K</h1>
            <h1 className="hover">O</h1>
            <h1 className="hover">N</h1>
            <h1 className="hover">T</h1>
            <h1 className="hover">A</h1>
            <h1 className="hover">K</h1>
            <h1 className="hover">T</h1>
          </div>
        </div>
        <div className="Contact__content">
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="imie">
                      <b>Podaj imię</b>
                    </label>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefName}
                      type="text"
                      placeholder="Imię"
                      value={this.state.name}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="nazwisko">
                      <b>Podaj nazwisko</b>
                    </label>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefSurname}
                      type="text"
                      placeholder="Nazwisko"
                      value={this.state.Surname}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <b>Podaj email</b>
                    </label>
                  </td>
                  <td>
                    <Input
                      handleRef={this.handleRefEmail}
                      type="text"
                      placeholder="Email"
                      value={this.state.Email}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Wiadomość</b>
                  </td>
                  <td>
                    <textarea className="input" placeholder="Wiadomosc" />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <input className="btn" type="submit" value="Prześlij" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    );
  }
}
