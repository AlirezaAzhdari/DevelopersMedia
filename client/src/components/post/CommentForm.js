import React, { Component } from "react";
import { connect } from "react-redux";
import PropsTypes from "prop-types";
import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";
import { addComment } from "./../../Actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { auth } = this.props;

    var newComment = {
      text: this.state.text,
      name: auth.user.name,
      avatar: auth.user.avatar
    };

    this.props.addComment(this.props.postId, newComment);

    this.setState({ text: "" });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white text-right">
            ... چیزی بگو
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="نظر دهید"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark float-right">
                تایید
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  auth: PropsTypes.object.isRequired,
  errors: PropsTypes.object.isRequired,
  addComment: PropsTypes.func.isRequired,
  postId: PropsTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
