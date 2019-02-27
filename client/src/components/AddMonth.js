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
    this.props.addMonth(data);
    this.setState({
      name: "",
      year: ""
    });
    this.props.history.push("/dashboard");
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
          <button type="submit"> Add </button>
          <button>
            <Link to="/dashboard"> Back </Link>
          </button>
        </form>
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
