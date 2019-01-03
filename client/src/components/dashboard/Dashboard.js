import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../Actions/profileAction";
import ProfileActions from "./Dashboard/ProfileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              {" "}
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link> خوش
              آمدید
            </p>
            <ProfileActions />
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted"> {user.name} خوش آمدید</p>
            <p>
              {" "}
              هنوز پروفایلی برای خودتان نساختید. لطفا یک پروفایل برای خود بسازید
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              ساخت پروفایل
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-4">داشبورد</h2>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
