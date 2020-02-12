import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteExperience } from "./../../store/actions/profile";
import Moment from "react-moment";

const Experience = props => {
  console.log(props.experiences.length);
  const experiences = props.experiences.map(exp => {
    return (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => {
              props.deleteExperience(exp._id);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  const noExperiences = (
    <p>You have not yet added any experience. Please add some info</p>
  );

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      {props.experiences.length === 0 ? (
        noExperiences
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      )}
    </Fragment>
  );
};

Experience.propTypes = {
  experiences: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
