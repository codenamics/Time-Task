import React, { Component } from "react";
import TimeFormat from "hh-mm-ss";
import PropTypes from "prop-types";

class TotalTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTime: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { time } = props;
    if (time) {
      const total = time.tasks.reduce((total, task) => {
        return total + parseFloat(task.time.toString());
      }, 0);
      return {
        totalTime: total
      };
    }
    return null;
  }

  render() {
    if (this.props.time.tasks.length > 0) {
      return (
        <React.Fragment>
          <div className="table-row">
            <span className="bold"> Total Time </span> <span />
            <span className="span-border-left bold">
              {TimeFormat.fromS(this.state.totalTime, "hh:mm:ss")}
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
