import axios from "axios";
import Cookies from "universal-cookie";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

const cookies = new Cookies();

export function checkIfLoggedIn() {
  if (
    cookies.get("name") &&
    cookies.get("token") &&
    cookies.get("token").length > 10 &&
    cookies.get("email").length > 1
  ) {
    return true;
  } else {
    return false;
  }
}

//https://backab.000webhostapp.com

export function numberOfCars() {
  const params = new URLSearchParams();
  params.append("first_name", "X");

  return axios
    .post("https://backendba.000webhostapp.com/api/info.php", params, config)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      return error;
    });
}

export function getBrands() {
  const params = new URLSearchParams();
  params.append("first_name", "X");

  return axios
    .post(
      "https://backendba.000webhostapp.com/api/cars/brands.php",
      params,
      config
    )
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      return error;
    });
}

export function getUserInfo() {
  const params = new URLSearchParams();
  params.append("email", cookies.get("email"));

  return axios
    .post(
      "https://backendba.000webhostapp.com/api/user/userinfo.php",
      params,
      config
    )
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      return error;
    });
}

export function getAllCars() {
  const params = new URLSearchParams();
  params.append("email", cookies.get("email"));

  return axios
    .post(
      "https://backendba.000webhostapp.com/api/cars/allcars.php",
      params,
      config
    )
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      return error;
    });
}

export function getCars(brand) {
  const params = new URLSearchParams();
  params.append("model", brand);

  return axios
    .post(
      "https://backendba.000webhostapp.com/api/cars/cars.php",
      params,
      config
    )
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      return error;
    });
}

export function isAdmin() {
  const params = new URLSearchParams();
  params.append("email", cookies.get("email"));

  return axios
    .post(
      "https://backendba.000webhostapp.com/api/user/isAdmin.php",
      params,
      config
    )
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      return error;
    });
}

export function getLocalizations() {
  const params = new URLSearchParams();
  params.append("xx", "xx");

  return axios
    .post(
      "https://backendba.000webhostapp.com/api/localizations.php",
      params,
      config
    )
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      return error;
    });
}

export function addCar(
  brand,
  model,
  production_date,
  image,
  localization,
  price
) {
  const params = new URLSearchParams();
  params.append("brand", brand);
  params.append("model", model);
  params.append("production_date", production_date);
  params.append("image", image);
  params.append("localization", localization);
  params.append("price", price);
  return axios
    .post(
      "https://backendba.000webhostapp.com/api/cars/addCar.php",
      params,
      config
    )
    .catch(function(error) {
      return error;
    });
}

export function update(model, production_date, image, localization, price) {
  const params = new URLSearchParams();
  params.append("model", model);
  params.append("production_date", production_date);
  params.append("image", image);
  params.append("localization", localization);
  params.append("price", price);
  return axios
    .post(
      "https://backendba.000webhostapp.com/api/cars/update.php",
      params,
      config
    )
    .catch(function(error) {
      return error;
    });
}

export function addUser(first_name, last_name, name, email, password, isAdmin) {
  const params = new URLSearchParams();
  params.append("first_name", first_name);
  params.append("last_name", last_name);
  params.append("name", name);
  params.append("email", email);
  params.append("password", password);
  params.append("isAdmin", isAdmin);

  return axios
    .post(
      "https://backendba.000webhostapp.com/api/user/addUser.php",
      params,
      config
    )
    .catch(function(error) {
      return error;
    });
}

export function register(first_name, last_name, name, email, password) {
  const params = new URLSearchParams();
  params.append("first_name", first_name);
  params.append("last_name", last_name);
  params.append("username", name);
  params.append("email", email);
  params.append("password", password);
  return axios
    .post(
      "https://backendba.000webhostapp.com/api/register.php",
      params,
      config
    )
    .catch(function(error) {
      return error;
    });
}

export function login(email, password) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  return axios
    .post("https://backendba.000webhostapp.com/api/login.php", params, config)
    .then(function(response) {
      console.log(response.data);
      cookies.set("name", response.data.name, { path: "/" });
      cookies.set("token", response.data.jwt, { path: "/" });
      cookies.set("email", response.data.email, { path: "/" });

      window.location.reload(false);
    });
}

export function logout() {
  cookies.remove("name", { path: "/" });
  cookies.remove("token", { path: "/" });
  cookies.remove("email", { path: "/" });

  window.location.reload(false);
}
