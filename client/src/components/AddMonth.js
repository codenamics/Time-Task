import React, { Component } from "react";
import { addMonth } from "../actions/monthActions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

class AddMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      year: ""
    };
  }

  onSubmitForm = e => {
    e.preventDefault();
    const { name, year } = this.state;
    const data = {
      name,
      year
    };
    this.props.addMonth(data, this.props);
    this.setState({
      name: "",
      year: ""
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="con-addTask">
        <form className="addTask" onSubmit={this.onSubmitForm}>
          <label htmlFor=""> Month </label>
          <input
            type="text"
            onChange={this.onChange}
            name="name"
            value={this.state.name}
          />
          <label htmlFor=""> Year </label>
          <input
            type="text"
            onChange={this.onChange}
            name="year"
            value={this.state.year}
          />
          <button type="submit" className="form__log-btn">
            Add
          </button>
        </form>

        <Link className="form__log-btn" to="/dashboard">
          Back
        </Link>
      </div>
    );
  }
}

AddMonth.propTypes = {
  addMonth: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    addMonth
  }
)(withRouter(AddMonth));
