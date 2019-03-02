import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TaskRow from "./TaskRow";
import { deleteMonth } from "../actions/monthActions";

class MonthRow extends Component {
  onDeleteClick = id => {
    this.props.deleteMonth(id);
  };
  onAction = id => {
    this.props.history.push(`/add/${id}`);
  };
  render() {
    const { monthItem } = this.props;
    return (
      <div className="main__one">
        <div className="table-flex">
          <div className="main__top-left">
            <span className="main__top-left--1 check">
              {monthItem.name}&nbsp;|&nbsp;
              <span className="month-year">{monthItem.year}</span>
            </span>
            <span className="main__top-left--2"> Check your tasks </span>
          </div>
          <button
            className="form__log-btn"
            onClick={this.onAction.bind(this, monthItem._id)}
          >
            Add new Task
          </button>
          <button
            className="form__log-btn form__log-btn-red"
            onClick={this.onDeleteClick.bind(this, monthItem._id)}
          >
            Delete Month
          </button>
        </div>
        <TaskRow key={monthItem._id} task={monthItem} />
      </div>
    );
  }
}

export default connect(
  null,
  {
    deleteMonth
  }
)(withRouter(MonthRow));
