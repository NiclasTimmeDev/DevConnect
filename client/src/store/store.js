import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import rootReducer from "./reducers";
import alert from "./reducers/alert";
import auth from "./reducers/auth";
import profile from "./reducers/profile";

const initState = {};

const rootReducer = combineReducers({
  alert,
  auth,
  profile
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
