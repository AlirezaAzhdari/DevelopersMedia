import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addExperience } from "../../Actions/profileAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      disabled: false,
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newExperience = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(newExperience, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                بازگشت
              </Link>
              <h1 className="display-4 text-center">
                تجربه‌های شغلی خود را وارد کنید
              </h1>
              <p className="lead text-center">
                اگر شغلی به عنوان برنامه نویس/توسعه دهنده داشته‌اید یا دارید،
                وارد کنید
              </p>
              <small className="d-block pb-3 text-right">فیلد ضروری = *</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* Job Title"
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="* Company"
                  name="company"
                  onChange={this.onChange}
                  value={this.state.company}
                  error={errors.company}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  onChange={this.onChange}
                  value={this.state.location}
                  error={errors.location}
                />

                <h6 className="text-right">تاریخ شروع</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  onChange={this.onChange}
                  value={this.state.from}
                  error={errors.from}
                />
                <h6 className="text-right">تاریخ پایان</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  onChange={this.onChange}
                  value={this.state.to}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <div class="form-check mb-4 float-right">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label class="form-check-label text-right" htmlFor="current">
                    شغل فعلی
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="بعضی از وضایف شغلی که داشته‌اید"
                  name="description"
                  onChange={this.onChange}
                  value={this.state.description}
                  error={errors.description}
                />
                <input
                  type="submit"
                  value="تایید"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
