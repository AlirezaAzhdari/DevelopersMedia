import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">شبکه توسعه دهندگان</h1>
                <p className="lead">
                  {" "}
                  یک حساب کاربری توسعه دهنده بساز، پست بذار، اصلاعاتت رو به
                  اشتراک بذار و از بقیه توسعه دهنده‌ها در کارهات کمک بگیر
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  ثبت نام
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  ورود
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStatetoProps)(Landing);
