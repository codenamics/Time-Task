import React, { Component } from "react";
// import { addTasks } from "../actions/tasksAction";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      isHigh: null
    };
  }

  onSubmitForm = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      isHigh: this.state.isHigh
    };
    this.props.addTasks(data);
    this.setState({
      title: "",
      description: "",
      isHigh: ""
    });
    this.props.history.push("/dashboard");
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
    console.log(this.state.isHigh);
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
          <label htmlFor=""> Podwyzszone koszty ? </label>{" "}
          <input
            name="isHigh"
            type="checkbox"
            checked={this.state.isHigh}
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
    // addTasks
  }
)(withRouter(AddTask));
