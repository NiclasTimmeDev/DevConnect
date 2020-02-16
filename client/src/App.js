import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./components/layout/Alert";

import { Provider } from "react-redux";
import store from "./store/store";

import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dasboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/actions/auth";

const App = () => {
  //If App is loaded, check if there is a token, in the localStorage
  //If so, include it in the default axios header (done by setAuhtToken)
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  /*
  Like componentDidMount
  dispatches the loadUser() action from store/actions/auth
  1. If there is a token, the function will put the token to the global axios header
  2. Also, if the token is valid, the function will find the corresponding user and put it in the redux state
  */
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route path="/" exact component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/profiles" component={Profiles} exact />
              <Route path="/profiles/:id" component={Profile} />

              <PrivateRoute
                path="/create-profile"
                component={CreateProfile}
                exact
              />
              <PrivateRoute path="/posts" component={Posts} exact />
              <PrivateRoute path="/posts/:id" component={Post} exact />
              <PrivateRoute
                path="/edit-profile"
                component={EditProfile}
                exact
              />
              <PrivateRoute
                path="/add-experience"
                component={AddExperience}
                exact
              />
              <PrivateRoute
                path="/add-education"
                component={AddEducation}
                exact
              />

              <PrivateRoute path="/dashboard" component={Dashboard} exact />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
