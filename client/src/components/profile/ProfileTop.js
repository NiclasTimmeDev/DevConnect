import React from "react";
import PropTypes from "prop-types";

const ProfileTop = props => {
  const displayAttribute = attribute => {
    return attribute && attribute !== "" ? attribute : null;
  };

  return (
    <div className="profile-top bg-primary p-2">
      <img
        class="round-img my-1"
        src={displayAttribute(props.profile.user.avatar)}
        alt="avatar"
      />
      <h1 className="large">{displayAttribute(props.profile.user.name)}</h1>
      <p className="lead">
        {displayAttribute(props.profile.status)}
        {props.profile.company && <span> at {props.profile.company}</span>}
      </p>
      <p>{displayAttribute(props.profile.location)}</p>
      <div className="icons my-1">
        <a
          href={displayAttribute(props.profile.website)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-globe fa-2x"></i>
        </a>
        {props.profile.social.twitter && (
          <a
            href={props.profile.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}

        {props.profile.socialfacebook && (
          <a
            href={props.profile.socialfacebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}

        {props.profile.sociallinkedin && (
          <a
            href={props.profile.sociallinkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}

        {props.profile.social.youtube && (
          <a
            href={props.profile.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}

        {props.profile.social.instagram && (
          <a
            href={props.profile.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
