import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TaskRow from "./TaskRow";
import { deleteMonth } from "../actions/monthActions";
import TotalTime from "./TotalTime";
import { saveAs } from "file-saver";
import axios from "axios";
class MonthRow extends Component {
  onDeleteClick = id => {
    this.props.deleteMonth(id);
  };
  onAction = id => {
    this.props.history.push(`/add/${id}`);
  };
  onGen = id => {
    axios
      .post(
        `https://vast-everglades-35412.herokuapp.com/api/tasks/create-pdf/${id}`
      )
      .then(res =>
        axios.get(
          "https://vast-everglades-35412.herokuapp.com/api/tasks/fetch-pdf",
          {
            responseType: "blob"
          }
        )
      )
      .then(res => {
        const pdfBlob = new Blob([res.data], {
          type: "application/pdf"
        });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };
  render() {
    const { monthItem } = this.props;
    console.log(monthItem);
    return (
      <div className="main__one">
        <div className="table-flex">
          <div className="main__top-left">
            <span className="main__top-left--1 check">
              {" "}
              {monthItem.name} & nbsp; | & nbsp;{" "}
              <span className="month-year"> {monthItem.year} </span>{" "}
            </span>{" "}
            <span className="main__top-left--2"> Check your tasks </span>{" "}
          </div>{" "}
          <button
            className="form__log-btn"
            onClick={this.onAction.bind(this, monthItem._id)}
          >
            Add new Task{" "}
          </button>{" "}
          <button
            className="form__log-btn"
            onClick={this.onGen.bind(this, monthItem._id)}
          >
            PDF{" "}
          </button>{" "}
          <button
            className="form__log-btn form__log-btn-red"
            onClick={this.onDeleteClick.bind(this, monthItem._id)}
          >
            Delete Month{" "}
          </button>{" "}
        </div>{" "}
        <TaskRow key={monthItem._id} task={monthItem} />{" "}
        <TotalTime time={monthItem} />{" "}
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
