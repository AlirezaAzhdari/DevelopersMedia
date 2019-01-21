import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createProfile } from "../../Actions/profileAction";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import TextFieldGroup from "../common/TextFieldGroup";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
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

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="آدرس پروفایل توییتر"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="آدرس پروفایل فیسبوک"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="آدرس پروفایل لینکدین"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="آدرس پروفایل یوتیوب"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="آدرس پروفایل اینستاگرام "
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* سطح شغلی خود را مشخص کنید", value: 0 },
      { label: "توسعه دهنده", value: "Developer" },
      { label: "توسعه دهنده حرفه‌ای", value: "Junior Developer" },
      { label: "توسعه دهنده تازه‌کار", value: "Senior Developer" },
      { label: "مدیر پروژه", value: "Manager" },
      { label: "دانشجو یا در حال یادگیری", value: "Student or Learning" },
      { label: "استاد", value: "Instructor or Teacher" },
      { label: "کارآموز", value: "Intern" },
      { label: "سایر", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">پروفایل خود را بسازید</h1>
              <p className="lead text-center">
                اطلاعات خود را برای ساخت پروفایل وارد کنید
              </p>
              <small className="d-block pb-3 text-right">فیلد ضروری = *</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="نام کاربری *"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="یک نام منحصر به فرد برای پروفایل شما"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="در چه سطحی از مهارت در شغل خود هستید"
                />
                <TextFieldGroup
                  placeholder="شرکت"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="می‌تواند شرکت خودتان یا جایی که کار کردید باشد"
                />
                <TextFieldGroup
                  placeholder="وبسایت"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="می‌تواند وبسایت شخصی یا تجاری باشد"
                />
                <TextFieldGroup
                  placeholder="مکان"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="مثال: فارس، شیراز"
                />
                <TextFieldGroup
                  placeholder="مهارت‌ها *"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="HTML,CSS,JavaScript,PHP :مثال"
                />
                <TextFieldGroup
                  placeholder="یوزرنیم گیت‌هاب"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="اگر می‌خواهید آخرین ریپازیتوری‌ها و لینک گیت‌هاب تان نمایش داده شود، یوزر نیم خود را وارد کنید"
                />
                <TextAreaFieldGroup
                  placeholder="بیوگرافی کوتاه"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="کمی راجع به خود توضیح دهید"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light float-right"
                  >
                    لینک‌ شبکه‌های اجتماعی خود را وارد کنید
                  </button>
                  <span className="text-muted">اختیاری</span>
                </div>
                {socialInputs}
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
