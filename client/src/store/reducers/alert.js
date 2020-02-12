import * as types from "./../actions/types";

const initState = [];

const alert = (state = initState, action) => {
  switch (action.type) {
    case types.SET_ALERT:
      return [...state, action.payload];
    case types.REMOVE_ALERT:
      return [
        state.filter(alert => {
          return alert.id !== action.payload;
        })
      ];
    default:
      return state;
  }
};

export default alert;
