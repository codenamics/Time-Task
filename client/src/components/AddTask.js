import React, { Component } from "react";
import { addTasks } from "../actions/tasksAction";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      time: 0
    };
  }
  onSubmitForm = e => {
    e.preventDefault();
    const { title, description, time } = this.state;
    const data = {
      title,
      description,
      time,
      id: this.props.match.params
    };
    this.props.addTasks(data);
    this.setState({
      title: "",
      description: ""
    });
    window.location.href = "/dashboard";
  };
  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };
  render() {
    return (
      <div className="con-addTask">
        <form className="addTask" onSubmit={this.onSubmitForm}>
          <label htmlFor=""> Title </label>
          <select name="title" onChange={this.handleChange("title")}>
            <option value="" disabled selected>
              Select your option
            </option>
            <option value="SDW mapping">SDW mapping</option>
            <option value="CMR study specific-logic">
              CMR study specific-logic
            </option>
            <option value="CMR study specific-programming">
              CMR study specific-programming
            </option>
            <option value="CMR study specific-test scenarion">
              CMR study specific-test scenarion
            </option>
            <option value="CMR study specific-creating test data">
              CMR study specific-creating test data
            </option>
            <option value="ODW mapping">ODW mapping</option>
            <option value="XRR RISC-logic">XRR RISC-logic</option>
            <option value="XRR RISC-programming">XRR RISC-programming</option>
            <option value="XRR RISC-creating test data">
              XRR RISC-creating test data
            </option>
            <option value="XRR RISC-configure file loader">
              XRR RISC-configure file loader
            </option>
          </select>

          <label htmlFor=""> Description </label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange("description")}
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

AddTask.propTypes = {
  addTasks: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    addTasks
  }
)(withRouter(AddTask));
