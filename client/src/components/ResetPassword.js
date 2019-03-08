import React, { Component } from "react";
import axios from "axios";
export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let data = {
      email: this.state.email
    };

    axios
      .post("https://vast-everglades-35412.herokuapp.com/api/users/reset", data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="auth">
        <div className="auth__left">
          <div className="auth__left-logo">
            <h2>
              Time / <span className="check"> Task </span>{" "}
            </h2>{" "}
          </div>{" "}
          <div className="auth__left-form">
            <form className="form" onSubmit={this.onSubmit}>
              <input type="email" onChange={this.handleChange("email")} />{" "}
              <div className="form__log">
                <button type="submit" className="form__log-btn">
                  Reset{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
          <div className="disclaimer">
            <p> 1.0 2019 </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="auth__right">
          <div className="auth__right-head">
            <h1> Password Reset </h1>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}
