import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostFroms from "./PostForms";
import Spinner from "./../common/Spinner";
import { getPosts } from "./../../Actions/postActions";
import PostFeed from "./PostFeed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      if (posts.length > 0) {
        postContent = <PostFeed posts={posts} />;
      } else {
        postContent = <h3 className="text-right">هیچ پستی یافت نشد</h3>;
      }
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostFroms />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToprops = state => ({
  post: state.post
});

export default connect(
  mapStateToprops,
  { getPosts }
)(Posts);
