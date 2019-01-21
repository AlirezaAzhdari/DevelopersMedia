import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Header extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt={profile.user.name}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {_.isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              <p>
                {_.isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </p>
              <p>
                {_.isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {_.isEmpty(
                  profile.socials && profile.socials.youtube
                ) ? null : (
                  <a className="text-white p-2" href={profile.socials.youtube}>
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
                {_.isEmpty(
                  profile.socials && profile.socials.twitter
                ) ? null : (
                  <a className="text-white p-2" href={profile.socials.twitter}>
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}
                {_.isEmpty(
                  profile.socials && profile.socials.facebook
                ) ? null : (
                  <a className="text-white p-2" href={profile.socials.facebook}>
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}
                {_.isEmpty(
                  profile.socials && profile.socials.linkedin
                ) ? null : (
                  <a className="text-white p-2" href={profile.socials.linkedin}>
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}
                {_.isEmpty(
                  profile.socials && profile.socials.instagram
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.socials.instagram}
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Header;
