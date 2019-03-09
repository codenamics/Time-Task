import React, { Component } from "react";
import { addMonth } from "../actions/monthActions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
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
    const data = {
      name: this.state.name,
      year: this.state.year
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
            onChange={this.onChange}
          />
          <label htmlFor=""> Year </label>
          <input
            type="text"
            onChange={this.onChange}
            name="year"
            value={this.state.year}
            onChange={this.onChange}
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

export default connect(
  null,
  {
    addMonth
  }
)(withRouter(AddMonth));
