import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TaskRow from "./TaskRow";
import { deleteMonth, genPDF } from "../actions/monthActions";
import TotalTime from "./TotalTime";
import PropTypes from "prop-types";

class MonthRow extends Component {
  onDeleteClick = id => {
    this.props.deleteMonth(id);
  };
  onAction = id => {
    this.props.history.push(`/add/${id}`);
  };
  onGen = id => {
    this.props.genPDF(id, this.props);
  };
  render() {
    const { monthItem, month } = this.props;
    let btn;
    if (month.loading) {
      btn = (
        <button
          className="form__log-btn green-btn"
          onClick={this.onGen.bind(this, monthItem._id)}
          disabled="true"
        >
          Loading...
        </button>
      );
    } else {
      btn = (
        <button
          className="form__log-btn blue-btn"
          onClick={this.onGen.bind(this, monthItem._id)}
        >
          PDF
        </button>
      );
    }

    return (
      <div className="main__one">
        <div className="table-flex">
          <div className="main__top-left">
            <span className="main__top-left--1 check">
              {monthItem.name} &nbsp; | &nbsp;
              <span className="month-year"> {monthItem.year} </span>
            </span>
            <span className="main__top-left--2"> Check your tasks </span>
          </div>
          {btn}
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
        <TotalTime time={monthItem} />
      </div>
    );
  }
}

MonthRow.propTypes = {
  month: PropTypes.object.isRequired,
  monthItem: PropTypes.object.isRequired,
  deleteMonth: PropTypes.func.isRequired,
  genPDF: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  month: state.month
});

export default connect(
  mapStateToProps,
  {
    deleteMonth,
    genPDF
  }
)(withRouter(MonthRow));
