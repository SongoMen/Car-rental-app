import React from "react";
import { logout, getOrders } from "../../auth";
import Loader from "../elements/Loader";

import { ReactComponent as Car } from "../../icons/car.svg";
import { ReactComponent as Calendar } from "../../icons/calendar.svg";
import { ReactComponent as Map } from "../../icons/placeholder.svg";

let orders = {
  brand: [],
  model: [],
  price: [],
  start_date: [],
  end_date: [],
  localization: [],
  image: []
};

export default class Dashboard extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    getOrders()
      .then(res => {
        const {
          brand,
          model,
          end_date,
          start_date,
          image,
          localization,
          price
        } = orders;
        if (res.brand.length !== brand.length) {
          for (let i = 0; i < res.brand.length; i++) {
            brand.push(res.brand[i]);
            model.push(res.model[i]);
            end_date.push(res.end_date[i]);
            start_date.push(res.start_date[i]);
            image.push(res.image[i]);
            localization.push(res.localization[i]);
            price.push(res.price[i]);
          }
        }
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

  handleLogout() {
    logout();
  }

  render() {
    const {
      brand,
      model,
      end_date,
      start_date,
      image,
      localization,
      price
    } = orders;
    document.title = "Samochodex - Panel";
    return (
      <div className="Dashboard">
        {this.state.loading ? (
          <Loader />
        ) : (
          <div className="Dashboard__content">
            <div className="Dashboard__info">
              <h1>Panel Główny</h1>
            </div>
            <div className="Dashboard__cars">
              <div className="Dashboard__title">
                <Car />
                <h4>Lista twoich zamówień:</h4>
              </div>
              <div className="Dashboard__orders">
                {brand.map((val, indx) => {
                  return (
                    <div key={indx} className="Dashboard__order">
                      <div className="Dashboard__left">
                        <img src={image[indx]} alt={val} />
                        <div className="Dashboard__desc">
                          <h3>{val + " " + model[indx]}</h3>
                          <div className="Dashboard__dates">
                            <Calendar />
                            <h4>
                              {start_date[indx]} - {end_date[indx]}
                            </h4>
                          </div>
                          <div className="Dashboard__place">
                            <Map />
                            <h4>{localization[indx]}</h4>
                          </div>
                        </div>
                      </div>
                      <h4 className="price">{price[indx]}zł</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
