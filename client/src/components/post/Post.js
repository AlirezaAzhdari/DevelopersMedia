import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "./../common/Spinner";
import { getPost } from "./../../Actions/postActions";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;

    let commentsContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      commentsContent = <Spinner />;
    } else {
      commentsContent = (
        <div>
          <PostItem post={post} showAction={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div class="post">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                بازگشت
              </Link>
              {commentsContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  post: state.post
});

export default connect(
  mapStatetoProps,
  { getPost }
)(Post);
