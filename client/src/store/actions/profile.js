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

export const addExperience = (formData, history) => {
  return async dispatch => {
    try {
      const res = await axios.put("/api/profile/experience", formData);
      dispatch({
        type: types.UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("Experience added", "success"));

      history.push("/dashboard");
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

export const addEducation = (formData, history) => {
  return async dispatch => {
    try {
      const res = await axios.put("/api/profile/education", formData);
      dispatch({
        type: types.UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("Education added", "success"));

      history.push("/dashboard");
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

export const deleteExperience = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch({
        type: types.UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Experience deleted", "success"));
    } catch (error) {
      console.log(error.message);
      dispatch(setAlert("Sorry, something went wrong. Try again!"));
    }
  };
};

export const deleteEducation = id => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch({
        type: types.UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Education deleted", "success"));
    } catch (error) {
      console.log(error.message);
      dispatch(setAlert("Sorry, something went wrong. Try again!"));
    }
  };
};

export const deleteAccount = () => {
  return async dispatch => {
    if (window.confirm("Are you sure? This can NOT be undone")) {
      try {
        const res = await axios.delete(`/api/profile`);
        dispatch({
          type: types.CLEAR_PROFILE
        });
        dispatch({
          type: types.ACCOUNT_DELETED
        });
        dispatch(setAlert("Your Account has been deleted", "success"));
      } catch (error) {
        console.log(error.message);
        dispatch(setAlert("Sorry, something went wrong. Try again!"));
      }
    }
  };
};
