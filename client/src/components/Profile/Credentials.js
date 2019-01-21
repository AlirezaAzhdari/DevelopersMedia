import React, { Component } from "react";
import Moment from "react-moment";

class Credentials extends Component {
  render() {
    const { education, experience } = this.props;

    const experiences = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>عنوان شغلی :</strong>
          {exp.title}
        </p>
        <p>
          <strong>توضیحات :</strong>
          {exp.description}
        </p>
      </li>
    ));

    const educations = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>رشته :</strong> {edu.fieldOfStudy}
        </p>
        <p>
          <strong>مدرک :</strong> {edu.degree}
        </p>
        <p>
          <strong>توضیحات :</strong> {edu.description}
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
