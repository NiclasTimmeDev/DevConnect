import axios from "axios";
import * as types from "./types";
import setAlert from "./alert";
import setAuthToken from "./../../utils/setAuthToken";

/*
1. If token exists, put it to the global header
2. Try to fetch the logged in user from the db. This will only work if the token in the header is valid
3. If the token is valid and a user is found, put that user in the redux state
*/
export const loadUser = () => {
  return async dispatch => {
    //1:
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    //2:
    try {
      const res = await axios.get("/api/auth");

      //3:
      dispatch({
        type: types.USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: types.AUTH_ERROR
      });
    }
  };
};

export const register = (name, email, password) => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/users/register", {
        name,
        email,
        password
      });

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        console.log(localStorage);
        dispatch({
          type: types.REGISTER_SUCCESS,
          payload: res.data
        });
        dispatch(loadUser());
      } else if (res.status === 400) {
        console.log(res.data);
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }

      dispatch({
        type: types.REGISTER_FAIL
      });
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: res.data
        });

        dispatch(loadUser());
      } else if (res.status === 400) {
        console.log(res.data);
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }

      dispatch({
        type: types.LOGIN_FAIL
      });
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: types.LOGOUT
    });
  };
};
