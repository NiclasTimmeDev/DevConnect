import * as types from "./types";
import uuid from "uuid";

/*
1. generate uid
2. set an alert with the delivered msg, type and id. Store them in redux
2. (ctd.) this will lead to the display of an alert at the top of the page
3. Wait 5 seconds, then remove the alert
*/
const setAlert = (msg, alertType) => {
  return async dispatch => {
    //1:
    const id = uuid.v4();
    //2:
    dispatch({
      type: types.SET_ALERT,
      payload: { msg, alertType, id }
    });
    //3:
    setTimeout(() => {
      dispatch({
        type: types.REMOVE_ALERT,
        payload: id
      });
    }, 5000);
    try {
    } catch (error) {
      console.error(error.message);
    }
  };
};

export default setAlert;
