import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCurrentProfileByHandle } from "../../Actions/profileAction";
import Spinner from "../common/Spinner";
import Header from "./Header";
import About from "./About";
import Credentials from "./Credentials";
import Github from "./Github";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getCurrentProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { loading, profile } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                بازگشت{" "}
              </Link>
            </div>
            <div className="col-md-6" />
          </div>

          <Header profile={profile} />
          <About profile={profile} />
          <Credentials
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <Github username={profile.githubusername} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfileByHandle: PropTypes.func.isRequired
};

const mapSateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapSateToProps,
  { getCurrentProfileByHandle }
)(Profile);
