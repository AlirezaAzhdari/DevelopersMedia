import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addEducation } from "../../Actions/profileAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldOfStudy: "",
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

    const newEducation = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(newEducation, this.props.history);
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
                سوابق تحصیلی خود را وارد کنید
              </h1>
              <p className="lead text-center">
                هر سابقه تحصیلی در دانشگاه، موسسات آموزشی یا آموزشگاه‌ها دارید،
                وارد کنید
              </p>
              <small className="d-block pb-3 text-right">فیلد ضروری = *</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="رشته *"
                  name="fieldOfStudy"
                  onChange={this.onChange}
                  value={this.state.fieldOfStudy}
                  error={errors.fieldOfStudy}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="مدرک *"
                  name="degree"
                  onChange={this.onChange}
                  value={this.state.degree}
                  error={errors.degree}
                />

                <TextFieldGroup
                  type="text"
                  placeholder="عنوان دانشگاه *"
                  name="school"
                  onChange={this.onChange}
                  value={this.state.school}
                  error={errors.school}
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
                    در حال تحصیل
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="توضیحی کوتاه درباره این سابقه تحصیلی"
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
