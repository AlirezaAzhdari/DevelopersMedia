import React, { Component } from "react";
import Moment from "react-moment";

class Credentials extends Component {
  render() {
    const { education, experience } = this.props;

    const experiences = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4 className="text-right">{exp.company}</h4>
        <p className="text-right">
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p className="text-right">
          {exp.title} <strong> : عنوان شغلی </strong>
        </p>
        <p className="text-right">
          {exp.description} <strong> : توضیحات </strong>
        </p>
      </li>
    ));

    const educations = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4 className="text-right">{edu.school}</h4>
        <p className="text-right">
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p className="text-right">
          {edu.fieldOfStudy} <strong>: رشته </strong>
        </p>
        <p className="text-right">
          {edu.degree} <strong> : مدرک </strong>
        </p>
        <p className="text-right">
          {edu.description} <strong> : توضیحات </strong>
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">سوابق شغلی</h3>
          {experiences.length > 0 ? (
            <ul className="list-group">{experiences}</ul>
          ) : (
            <p className="text-right">هیچ سابقه شغلی ثبت نشده است</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">سوابق تحصیلی</h3>
          {educations.length > 0 ? (
            <ul className="list-group">{educations}</ul>
          ) : (
            <p className="text-right">هیچ سابقه تحصیلی ثبت نشده است</p>
          )}
        </div>
      </div>
    );
  }
}

export default Credentials;
