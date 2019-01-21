import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "./../../Actions/profileAction";
import Spinner from "../common/Spinner";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { loading, profiles } = this.props.profile;
    let profilesContent;

    if (profiles === null || loading) {
      profilesContent = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profilesContent = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profilesContent = <h3>هیچ پروفایلی یافت نشد</h3>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">
                پروفایل‌های توسعه دهندگان
              </h1>
              <p className="lead text-center">
                جستجو کنید و با دیگر توسعه دهندگان ارتباط برقرار کنید
              </p>
              {profilesContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
