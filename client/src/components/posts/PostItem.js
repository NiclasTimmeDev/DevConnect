import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "./../../store/actions/post";

const PostItem = props => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/${props.post.user}`}>
          <img className="round-img" src={props.post.avatar} alt="avatar" />
          <h4>{props.post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{props.post.text}</p>
        <p className="post-date">
          Posted on {<Moment format="YYYY/MM/DD">{props.post.date}</Moment>}
        </p>
        {props.showActions && (
          <Fragment>
            <button
              onClick={() => {
                props.addLike(props.post._id);
              }}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>
              {props.post.likes.length > 0 && (
                <span>{props.post.likes.length}</span>
              )}
            </button>
            <button
              onClick={() => {
                props.removeLike(props.post._id);
              }}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${props.post._id}`} className="btn btn-primary">
              Discussion{" "}
              {props.post.comments.length > 0 && (
                <span className="comment-count">
                  {props.post.comments.length}
                </span>
              )}
            </Link>
            {!props.auth.loading && props.auth.user._id === props.post.user && (
              <button
                onClick={() => {
                  props.deletePost(props.post._id);
                }}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
