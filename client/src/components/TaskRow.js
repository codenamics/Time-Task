import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask } from "../actions/tasksAction";
import TimeFormat from "hh-mm-ss";
import { withRouter } from "react-router-dom";
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
            <span> {taskItem.title} </span>{" "}
            <span> {taskItem.description} </span>
            <span className="text-center ">
              {" "}
              {TimeFormat.fromS(taskItem.time, "hh:mm:ss")}{" "}
            </span>{" "}
            <i
              className="far fa-eye text-center "
              onClick={this.onAction.bind(this, task._id, taskItem._id)}
            />{" "}
            <i
              className="fas fa-times text-center "
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

export default connect(
  null,
  {
    deleteTask
  }
)(withRouter(TaskRow));
