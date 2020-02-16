import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "./../../store/actions/post";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const CommentItem = props => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profiles/${props.comment.user}`}>
          <img className="round-img" src={props.comment.avatar} alt="avatar" />
          <h4>{props.comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{props.comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYY/MM/DD">{props.comment.date}</Moment>
        </p>
        {!props.auth.loading && props.comment.user === props.auth.user._id && (
          <button
            onClick={() => {
              props.deleteComment(props.postId, props.comment._id);
            }}
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { deleteComment })(CommentItem);
