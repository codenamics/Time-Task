import React, { Component } from "react";
import TimeFormat from "hh-mm-ss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadTime, postTime } from "../actions/tasksAction";
import PropTypes from "prop-types";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStopped: true,
      seconds: 0,
      time: 0,
      isButtonDisabled: false
    };
  }

  componentDidMount() {
    const { id, task_id } = this.props.match.params;
    this.props.loadTime(id, task_id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { time } = this.props.task;
    if (time !== prevProps.task.time) {
      this.setState({
        seconds: time
      });
    }
  }

  goBack = () => {
    window.location.href = "/dashboard";
  };

  handleTimerStart = e => {
    e.preventDefault();
    this.setState({
      isButtonDisabled: true
    });
    this.timer = setInterval(() => {
      let time = TimeFormat.fromS(this.state.seconds, "hh:mm:ss");
      this.setState({
        seconds: this.state.seconds + 1,
        time
      });
    }, 1000);
  };

  handleTimerStop = () => {
    this.setState({
      isButtonDisabled: false
    });
    clearInterval(this.timer);
  };

  handleCapture = () => {
    const { id, task_id } = this.props.match.params;
    const { seconds } = this.state;
    let data = {
      time: seconds
    };
    this.props.postTime(id, task_id, data, this.props);
  };

  render() {
    return (
      <div className="container">
        <div className="timer-container">
          <div className="current-timer">
            {" "}
            {TimeFormat.fromS(this.state.seconds, "hh:mm:ss")}{" "}
          </div>{" "}
          <div className="timer-controls">
            <button
              className="btn btn-success mr-2 ml-2"
              onClick={this.handleTimerStart}
              disabled={this.state.isButtonDisabled}
            >
              Start Timer{" "}
            </button>{" "}
            <button
              className="btn btn-alert mr-2 ml-2"
              onClick={this.handleTimerStop}
            >
              Stop Timer{" "}
            </button>{" "}
            <button
              className="btn btn-info mr-2 ml-2"
              onClick={this.handleCapture}
            >
              Capture Time{" "}
            </button>{" "}
            <button className="btn btn-danger mr-2 ml-2" onClick={this.goBack}>
              Go back{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

Timer.propTypes = {
  loadTime: PropTypes.func.isRequired,
  postTime: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  task: state.task
});

export default connect(
  mapStateToProps,
  {
    loadTime,
    postTime
  }
)(withRouter(Timer));
