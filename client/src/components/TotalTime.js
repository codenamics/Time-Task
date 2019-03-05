import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTask } from "../actions/tasksAction";
import TimeFormat from "hh-mm-ss";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class TotalTime extends Component {
  state = {
    totalTime: null
  };
  static getDerivedStateFromProps(props, state) {
    const { time } = props;
    if (time) {
      const total = time.tasks.reduce((total, task) => {
        return total + parseFloat(task.time.toString());
      }, 0);
      return { totalTime: total };
    }
    return null;
  }

  render() {
    if (this.props.time.tasks.length > 0) {
      return (
        <React.Fragment>
          <div className="table-row">
            <span className="bold">Total Time</span>
            <span />
            <span className="span-border-left bold">
              {" "}
              {TimeFormat.fromS(this.state.totalTime, "hh:mm:ss")}{" "}
            </span>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default TotalTime;
