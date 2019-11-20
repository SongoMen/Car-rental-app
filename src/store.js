import { createStore } from "redux";
import reducer from "./reducers/reducer";

function configureStore() {
  return createStore(reducer, { leftbar: false, content: "" });
}

export default configureStore;
