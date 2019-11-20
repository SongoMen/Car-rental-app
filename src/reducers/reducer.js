import * as actions from "../actions/actions";

export default (state, action) => {
  switch (action.type) {
    case actions.SET_LEFTBAR:
      return { ...state, leftbar: action.payload };
    case actions.SET_CONTENT:
      return { ...state, content: action.payload };
    default:
      return state;
  }
};
