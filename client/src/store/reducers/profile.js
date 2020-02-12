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
    case types.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case types.PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case types.LOGOUT:
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
