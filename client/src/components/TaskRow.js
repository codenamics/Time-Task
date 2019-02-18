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
    this.props.history.push(
      `https://vast-everglades-35412.herokuapp.com/${id}`
    );
  };
  render() {
    const { task } = this.props;
    let time = TimeFormat.fromS(task.time, "hh:mm:ss");
    return (
      <div className="table-row">
        <span> {task.title} </span> <span> {task.description} </span>
        <span className="text-center "> {time} </span>{" "}
        {task.isHigh === "false" ? (
          <span className="text-center "> Tak </span>
        ) : (
          <span className="text-center ">Nie</span>
        )}{" "}
        <i
          class="far fa-eye text-center "
          onClick={this.onAction.bind(this, task._id)}
        />
        <i class="fas fa-pencil-alt text-center " />
        <i
          class="fas fa-times text-center "
          type="button"
          onClick={this.onDeleteClick.bind(this, task._id)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(
  mapStateToProps,
  {
    deleteTask
  }
)(withRouter(TaskRow));
