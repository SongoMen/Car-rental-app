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
    document.title = "CarBook - Admin";
    return (
      <div className="Admin">
        {this.state.loading && <Loader />}
        {status && !this.state.loading && (
          <div>
            <h1>Admin Panel</h1>
            <div className="Admin__buttons">
              <div className="btn" name="addCar" onClick={this.changeSection}>
                Add car
              </div>
              <div className="btn" name="addUser" onClick={this.changeSection}>
                Add user
              </div>
              <div className="btn" name="edit" onClick={this.changeSection}>
                Edit car
              </div>
              <div className="btn" name="remove" onClick={this.changeSection}>
                Remove car
              </div>
            </div>
            {this.state.section === "addCar" && <Add />}
            {this.state.section === "addUser" && <AddUser />}
            {this.state.section === "remove" && <RemoveCar />}
            {this.state.section === "edit" && <EditCar />}
          </div>
        )}
        {!status && !this.state.loading && <h1>Error</h1>}
      </div>
    );
  }
}
