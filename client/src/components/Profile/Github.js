import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";

class Github extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "",
      clientSecret: "",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, clientId, clientSecret, sort } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&clint_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => this.setState({ repos: data }))
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    const reposItem = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>
              {_.isEmpty(repo.description) ? null : (
                <span>{repo.description}</span>
              )}
            </p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              {repo.stargazers_count} : ستاره‌ها
            </span>
            <span className="badge badge-secondary mr-1">
              {repo.watchers_count} : بازدید
            </span>
            <span className="badge badge-success">
              {repo.forks_count} : فورک‌ها
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">آخرین پروژه‌های گیت‌هاب</h3>
        {reposItem}
      </div>
    );
  }
}

Github.propTypes = {
  username: PropTypes.string.isRequired
};

export default Github;
