import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TaskRow from "./TaskRow";
class MonthRow extends Component {
  //   onDeleteClick = id => {
  //     this.props.deleteTask(id);
  //   };
  onAction = id => {
    this.props.history.push(`/add/${id}`);
  };
  render() {
    const { monthItem } = this.props;
    console.log(monthItem._id);
    return (
      <div className="main__one">
        <div className="table-flex">
          <div className="main__top-left">
            <span className="main__top-left--1 check"> {monthItem.name} </span>
            <span className="main__top-left--2"> Check your tasks </span>
          </div>
          <button
            className="form__log-btn"
            onClick={this.onAction.bind(this, monthItem._id)}
          >
            {" "}
            Add new Task{" "}
          </button>
        </div>
        <TaskRow key={monthItem._id} task={monthItem} />
      </div>
    );
  }
}

export default withRouter(MonthRow);
