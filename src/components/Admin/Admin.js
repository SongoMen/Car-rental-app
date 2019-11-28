import React from "react";
import { isAdmin } from "../../auth";
import Loader from "../elements/Loader";
import Add from "./Add";
import AddUser from "./AddUser";
import RemoveCar from "./RemoveCar";
import EditCar from "./EditCar";

let status;

export default class Admin extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      section: ""
    };
    this.changeSection = this.changeSection.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    isAdmin()
      .then(res => {
        status = res.isAdmin === "1" ? true : false;
      })
      .then(() => {
        if (this._isMounted) {
          this.setState({
            loading: false
          });
        }
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  changeSection(el) {
    if (this._isMounted) {
      this.setState({
        section: el.target.getAttribute("name")
      });
    }
  }

  render() {
    document.title = "Samochodex - Admin";
    return (
      <div className="Admin">
        {this.state.loading && <Loader />}
        {status && !this.state.loading && (
          <div>
            <h1>Panel Admina</h1>
            <div className="Admin__buttons">
              <div className="btn" name="dodajsam" onClick={this.changeSection}>
                Dodaj samochód
              </div>
              <div className="btn" name="dodajuz" onClick={this.changeSection}>
                Dodaj użytkownika
              </div>
              <div className="btn" name="edytuj" onClick={this.changeSection}>
                Edytuj samochód
              </div>
              <div className="btn" name="usun" onClick={this.changeSection}>
                Usuń samochód
              </div>
            </div>
            {this.state.section === "dodajsam" && <Add />}
            {this.state.section === "dodajuz" && <AddUser />}
            {this.state.section === "usun" && <RemoveCar />}
            {this.state.section === "edytuj" && <EditCar />}
          </div>
        )}
        {!status && !this.state.loading && <h1>Error</h1>}
      </div>
    );
  }
}
