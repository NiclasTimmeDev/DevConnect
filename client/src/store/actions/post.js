import axios from "axios";
import setAlert from "./alert";
import * as types from "./types";

export const getPosts = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/posts");
      dispatch({
        type: types.GET_POSTS,
        payload: res.data
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

export const getPost = postId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/posts/${postId}`);
      dispatch({
        type: types.GET_POST,
        payload: res.data
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

export const addPost = formData => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/api/posts", formData, config);

      dispatch({
        type: types.ADD_POST,
        payload: res.data
      });
      dispatch(setAlert("Post created", "success"));
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

export const addLike = postId => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);
      dispatch({
        type: types.UPDATE_LIKES,
        payload: { postId, likes: res.data }
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

export const addComment = (postId, formData) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );

      dispatch({
        type: types.ADD_COMMENT,
        payload: res.data
      });
      dispatch(setAlert("Comment created", "success"));
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};
export const deleteComment = (postId, commentId) => {
  return async dispatch => {
    try {
      const res = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`
      );

      dispatch({
        type: types.REMOVE_COMMENT,
        payload: commentId
      });
      dispatch(setAlert("Comment removed", "success"));
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

export const removeLike = postId => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);
      dispatch({
        type: types.UPDATE_LIKES,
        payload: { postId, likes: res.data }
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};

export const deletePost = postId => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/posts/${postId}`);
      dispatch({
        type: types.DELETE_POST,
        postId: postId
      });
      dispatch(setAlert("Post removed", "success"));
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: types.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };
};
