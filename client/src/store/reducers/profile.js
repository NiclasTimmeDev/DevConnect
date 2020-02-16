import * as types from "./../actions/types";

const initState = {
  profile: null,
  profiles: [],
  repos: null,
  loading: true,
  error: {}
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case types.GET_PROFILE:
    case types.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case types.GET_REPOS:
      return {
        ...state,
        repos: action.payload
      };
    case types.PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        error: action.payload,
        loading: false
      };
    case types.LOGOUT:
    case types.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        repos: null,
        loading: true,
        error: {}
      };
    default:
      return state;
  }
};

export default reducer;
