import React, { Component } from "react";
import { addTasks } from "../actions/tasksAction";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
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
    const data = {
      title: this.state.title,
      description: this.state.description,
      time: this.state.time,
      id: this.props.match.params
    };
    this.props.addTasks(data);
    this.setState({
      title: "",
      description: ""
    });
    window.location.href = "/dashboard";
  };
  onChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className="con-addTask">
        <form className="addTask" onSubmit={this.onSubmitForm}>
          <label htmlFor=""> Title </label>{" "}
          <input
            type="text"
            onChange={this.onChange}
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />{" "}
          <label htmlFor=""> Description </label>{" "}
          <input
            type="text"
            onChange={this.onChange}
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          />{" "}
          <button type="submit"> Add </button>{" "}
          <button>
            <Link to="/dashboard"> Back </Link>{" "}
          </button>{" "}
        </form>{" "}
      </div>
    );
  }
}

export default connect(
  null,
  {
    addTasks
  }
)(withRouter(AddTask));
