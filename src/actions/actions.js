export const SET_LEFTBAR = "SET_LEFTBAR";
export const SET_CONTENT = "SET_CONTENT";

export function changeLeftBar(status) {
  return {
    type: SET_LEFTBAR,
    payload: status
  };
}

export function changeContent(status) {
  return {
    type: SET_CONTENT,
    payload: status
  };
}
