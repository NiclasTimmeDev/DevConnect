import axios from "axios";
import * as types from "./types";
import setAlert from "./alert";

export const getCurrentProfile = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data
      });
    } catch (error) {
      console.error(error.message);
      dispatch({
        type: types.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

export const createProfile = (formData, history, edit = false) => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/profile/me", formData);
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data
      });

      dispatch(
        setAlert(edit ? "Profile updated" : "Profile created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      console.error(error.message);
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: types.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};
