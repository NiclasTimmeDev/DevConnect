import * as types from "./../actions/types";

const initState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case types.GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case types.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case types.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post => {
          return post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post;
        }),
        loading: false
      };
    case types.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => {
          return post._id !== action.postId;
        }),
        loading: false
      };
    case types.POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case types.ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false
      };
    case types.REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => {
            return comment._id !== action.payload;
          })
        },
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
