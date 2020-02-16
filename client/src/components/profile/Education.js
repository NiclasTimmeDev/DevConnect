import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Education = props => {
  return (
    <div>
      <h2 className="text-primary">Education</h2>
      <h3 class="text-dark">{props.education.school}</h3>
      <p>
        <Moment format="YYY/MM/DD">{props.education.from}</Moment> -{" "}
        {props.education.to ? (
          <Moment format="YYY/MM/DD">{props.education.to}</Moment>
        ) : (
          " Now"
        )}
      </p>
      {props.education.degree && (
        <p>
          <strong>Degree: </strong> {props.education.degree}
        </p>
      )}
      {props.education.fieldofstudy && (
        <p>
          <strong>Field of Study: </strong> {props.education.fieldofstudy}
        </p>
      )}
      {props.education.description && (
        <p>
          <strong>Description: </strong>
          {props.education.description}
        </p>
      )}
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.object.isRequired
};

export default Education;
