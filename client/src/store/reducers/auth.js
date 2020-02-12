import * as types from "./../actions/types";

const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };
    case types.AUTH_ERROR:
    case types.LOGIN_FAIL:
    case types.REGISTER_FAIL:
    case types.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
};

export default auth;
