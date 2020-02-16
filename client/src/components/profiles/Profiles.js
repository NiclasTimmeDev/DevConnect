import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllProfiles } from "./../../store/actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = props => {
  useEffect(() => {
    props.getAllProfiles();
  }, []);

  const profiles = props.profile.profiles.map(pro => {
    return <ProfileItem key={pro._id} profile={pro} />;
  });

  return props.profile.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large primary-text">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {props.profile.profiles.length === 0 ? (
          <h4>No Profiles found</h4>
        ) : (
          profiles
        )}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
