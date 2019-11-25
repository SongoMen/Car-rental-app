import React from "react";
import { addCar, getBrands } from "../../auth";
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
    this.addCarFunc = this.addCarFunc.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addCarFunc(e) {
    e.preventDefault();
    const { brand, model, date, image, localization, price } = this.state;
    if (
      brand.length > 0 &&
      model.length > 0 &&
      date.length > 0 &&
      image.length > 0 &&
      localization.length > 0 &&
      price.length > 0
    ) {
      console.log("x");
      addCar(brand, model, date, image, localization, price).then(res => {
        console.log(res);
      });
    }
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
                  <b>Rok produkcji</b>
                </td>
                <td>
                  <Input
                    handleRef={this.handleRefDate}
                    type="number"
                    placeholder="Rok"
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
                    type="number"
                    placeholder="Cena"
                    value={this.state.price}
                  />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <input
                    className="btn"
                    onClick={this.addCarFunc}
                    type="submit"
                    value="Dodaj"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
