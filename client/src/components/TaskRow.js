import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask } from "../actions/tasksAction";
import TimeFormat from "hh-mm-ss";
import { withRouter } from "react-router-dom";
class TaskRow extends Component {
  onDeleteClick = id => {
    this.props.deleteTask(id);
  };
  onAction = id => {
    this.props.history.push(`/${id}`);
  };
  render() {
    const { task } = this.props;

    let taskItems;
    if (task.tasks === null) {
      taskItems = <p> Loading </p>;
    } else {
      if (task.tasks.length > 0) {
        taskItems = task.tasks.map(task => (
          <div className="table-row">
            <span> {task.title} </span> <span> {task.description} </span>
            <span className="text-center ">
              {" "}
              {TimeFormat.fromS(task.time, "hh:mm:ss")}{" "}
            </span>
          </div>
        ));
      } else {
        taskItems = <h4> You have no tasks </h4>;
      }

      console.log(task.tasks);

      return <React.Fragment>{taskItems}</React.Fragment>;
    }
  }
}

export default TaskRow;
