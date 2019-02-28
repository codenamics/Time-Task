import React, { Component } from "react";
import TimeFormat from "hh-mm-ss";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authAction";
import { withRouter } from "react-router-dom";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStopped: true,
      seconds: 0,
      time: 0
    };
  }
  componentDidMount() {
    const { id, task_id } = this.props.match.params;
    console.log(id, task_id);
    axios
      .get(
        `https://vast-everglades-35412.herokuapp.com/api/tasks/${id}/${task_id}`
      )
      .then(res => {
        this.setState({
          seconds: res.data[0].time
        });
      })
      .catch(err => console.log(err));
  }
  goBack = () => {
    this.props.history.push("/dashboard");
  };
  handleTimerStart = e => {
    e.preventDefault();

    this.timer = setInterval(() => {
      let time = TimeFormat.fromS(this.state.seconds, "hh:mm:ss");
      this.setState({
        seconds: this.state.seconds + 1,
        time
      });
    }, 1000);
  };

  handleTimerStop = () => {
    clearInterval(this.timer);
  };
  handleCapture = () => {
    const { id, task_id } = this.props.match.params;
    console.log(id);
    let data = {
      time: this.state.seconds
    };
    axios
      .put(
        `https://vast-everglades-35412.herokuapp.com/api/tasks/${id}/${task_id}`,
        data
      )
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    window.location.href = "/dashboard";
  };
  handelResetTimer = () => {
    this.setState({
      timerStopped: true,
      time: 0,
      seconds: 0
    });
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
            <button
              className="btn btn-danger mr-2 ml-2"
              onClick={this.handelResetTimer}
            >
              Reset!
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(withRouter(Timer));
