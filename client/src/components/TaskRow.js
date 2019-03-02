import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask } from "../actions/tasksAction";
import TimeFormat from "hh-mm-ss";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class TaskRow extends Component {
  onDeleteClick = (monthID, id) => {
    this.props.deleteTask(monthID, id);
  };
  onAction = (id, taskID) => {
    this.props.history.push(`/${id}/${taskID}`);
  };
  render() {
    const { task } = this.props;

    let taskItems;
    if (task.tasks === null) {
      taskItems = <p> Loading </p>;
    } else {
      if (task.tasks.length > 0) {
        taskItems = task.tasks.map(taskItem => (
          <div className="table-row" key={task._id}>
            <span className="span-border-left span-border-right">
              {" "}
              {taskItem.title}{" "}
            </span>{" "}
            <span> {taskItem.description} </span>
            <span className="span-border-left span-border-right">
              {" "}
              {TimeFormat.fromS(taskItem.time, "hh:mm:ss")}{" "}
            </span>{" "}
            <i
              className="far fa-clock text-center span-border-right"
              onClick={this.onAction.bind(this, task._id, taskItem._id)}
            />{" "}
            <i
              className="far fa-trash-alt text-center span-border-right"
              type="button"
              onClick={this.onDeleteClick.bind(this, task._id, taskItem._id)}
            />{" "}
          </div>
        ));
      } else {
        taskItems = <h4> You have no tasks </h4>;
      }

      return <React.Fragment> {taskItems} </React.Fragment>;
    }
  }
}

TaskRow.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

export default connect(
  null,
  {
    deleteTask
  }
)(withRouter(TaskRow));
