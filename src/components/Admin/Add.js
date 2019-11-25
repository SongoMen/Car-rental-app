import React from "react";
import { logout, getUserInfo } from "../../auth";
import Loader from "../elements/Loader";
import Input from "../elements/Input";

export default class Add extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      section: "",
      brand: "",
      model: "",
      date: "",
      image: "",
      localization: "",
      price: ""
    };
    this.changeSection = this.changeSection.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  changeSection(el) {
    if (this._isMounted) {
      this.setState({
        section: el
      });
    }
  }

  handleRefBrand = ref => {
    if (this._isMounted) {
      this.setState({
        brand: ref
      });
    }
  };

  handleRefModel = ref => {
    if (this._isMounted) {
      this.setState({
        model: ref
      });
    }
  };

  handleRefDate = ref => {
    if (this._isMounted) {
      this.setState({
        date: ref
      });
    }
  };

  handleRefImage = ref => {
    if (this._isMounted) {
      this.setState({
        image: ref
      });
    }
  };

  handleRefLocalization = ref => {
    if (this._isMounted) {
      this.setState({
        localization: ref
      });
    }
  };

  handleRefPrice = ref => {
    if (this._isMounted) {
      this.setState({
        price: ref
      });
    }
  };

  render() {
    return (
      <div className="Add">
        <h1>Dodaj samochód</h1>
        <form>
          <table>
            <tbody>
              <tr>
                <td>
                  <b>Marka</b>
                </td>
                <td>
                  <Input
                    handleRef={this.handleRefBrand}
                    type="text"
                    placeholder="Marka"
                    value={this.state.brand}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Model</b>
                </td>
                <td>
                  <Input
                    handleRef={this.handleRefModel}
                    type="text"
                    placeholder="Model"
                    value={this.state.model}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Data produkcji</b>
                </td>
                <td>
                  <Input
                    handleRef={this.handleRefDate}
                    type="text"
                    placeholder="Data"
                    value={this.state.date}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Zdjęcie</b>
                </td>
                <td>
                  <Input
                    handleRef={this.handleRefImage}
                    type="text"
                    placeholder="Zdjecie"
                    value={this.state.image}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Lokalizacja</b>
                </td>
                <td>
                  <Input
                    handleRef={this.handleRefLocalization}
                    type="text"
                    placeholder="Lokalizacja"
                    value={this.state.localization}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <b>Cena</b>
                </td>
                <td>
                  <Input
                    handleRef={this.handleRefPrice}
                    type="text"
                    placeholder="Cena"
                    value={this.state.price}
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
