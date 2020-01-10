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

  clearOrders() {
    orders.brand = [];
    orders.model = [];
    orders.end_date = [];
    orders.start_date = [];
    orders.image = [];
    orders.localization = [];
    orders.price = [];
  }

  componentDidMount() {
    this._isMounted = true;
    getOrders()
      .then(res => {
        this.clearOrders();
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
            brand.push(res.brand[parseInt(i)]);
            model.push(res.model[parseInt(i)]);
            end_date.push(res.end_date[parseInt(i)]);
            start_date.push(res.start_date[parseInt(i)]);
            image.push(res.image[parseInt(i)]);
            localization.push(res.localization[parseInt(i)]);
            price.push(res.price[parseInt(i)]);
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
              <h1>User Panel</h1>
            </div>
            <div className="Dashboard__cars">
              <div className="Dashboard__title">
                <Car />
                <h4>List of your orders:</h4>
              </div>
              <div className="Dashboard__orders">
                {brand.map((val, indx) => {
                  return (
                    <div key={indx} className="Dashboard__order">
                      <div className="Dashboard__left">
                        <img src={image[parseInt(indx)]} alt={val} />
                        <div className="Dashboard__desc">
                          <h3>{val + " " + model[parseInt(indx)]}</h3>
                          <div className="Dashboard__dates">
                            <Calendar />
                            <h5>
                              {start_date[parseInt(indx)]} - {end_date[parseInt(indx)]}
                            </h5>
                          </div>
                          <div className="Dashboard__place">
                            <Map />
                            <h5>{localization[parseInt(indx)]}</h5>
                          </div>
                        </div>
                      </div>
                      <h4 className="price">${price[parseInt(indx)]}</h4>
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
