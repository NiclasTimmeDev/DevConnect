import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGitHubRepos } from "./../../store/actions/profile";
import Spinner from "./../layout/Spinner";

const Github = props => {
  useEffect(() => {
    props.getGitHubRepos(props.username);
  }, []);

  return (
    <div className="profile-github">
      {!props.repos ? (
        <Spinner />
      ) : (
        props.repos !== [] &&
        props.repos.map(repo => {
          return (
            <div key={repo._id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

Github.propTypes = {
  getGitHubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    repos: state.profile.repos
  };
};

export default connect(mapStateToProps, { getGitHubRepos })(Github);
