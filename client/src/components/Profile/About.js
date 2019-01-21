import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class About extends Component {
  render() {
    const { profile } = this.props;

    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check " /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {profile.user.name} بیوگرافی
            </h3>
            <p className="lead text-right">
              {_.isEmpty(profile.bio) ? (
                <span>بیوگرافی ندارد {profile.user.name}</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">مهارت‌ها</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center ">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  profile: PropTypes.object.isRequired
};

export default About;
