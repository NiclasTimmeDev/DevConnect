import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../../store/actions/profile";
import Spinner from "./../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dasboard = props => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);

  const profile = (
    <Fragment>
      <DashboardActions />
    </Fragment>
  );

  const noProfile = (
    <Fragment>
      <p>You have not yet created a profile. Please add some info</p>
      <Link to="/create-profile" className="btn btn-primary my-1">
        Create Profile
      </Link>
    </Fragment>
  );

  return props.profile.profile && props.profile.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome,{" "}
        {props.auth.user && props.auth.user.name}
      </p>
      {props.profile.profile ? profile : noProfile}
    </Fragment>
  );
};

Dasboard.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getCurrentProfile })(Dasboard);
