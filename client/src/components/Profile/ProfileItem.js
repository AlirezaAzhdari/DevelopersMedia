import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              className="rounded-circle"
              src={profile.user.avatar}
              alt={profile.user.name}
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.handle}</h3>
            <p>{profile.status}</p>
            <p>
              {_.isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              نمایش پروفایل
            </Link>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <h4>مهارت‌ها</h4>
            <ul className="list-group">
              {profile.skills.map(skill => (
                <li key={skill.id} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
