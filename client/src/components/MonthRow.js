import React, { Component } from "react";
import { Link } from "react-router-dom";
import TaskRow from "./TaskRow";
class MonthRow extends Component {
  //   onDeleteClick = id => {
  //     this.props.deleteTask(id);
  //   };
  //   onAction = id => {
  //     this.props.history.push(`/${id}`);
  //   };
  render() {
    const { task } = this.props;
    console.log(task);
    // let time = TimeFormat.fromS(task.time, "hh:mm:ss");
    return (
      <div className="main__one">
        <div className="table-flex">
          <div className="main__top-left">
            <span className="main__top-left--1 check"> {task.name} </span>
            <span className="main__top-left--2"> Check your tasks </span>
          </div>
          <Link to="/add">
            <button className="form__log-btn"> Add new Task </button>
          </Link>
        </div>

        <TaskRow key={task.id} task={task} />
      </div>
    );
  }
}

export default MonthRow;
