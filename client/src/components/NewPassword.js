import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
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
      token: this.props.match.params.token,
      newPassword: this.state.password
    };
    axios
      .post(
        "https://vast-everglades-35412.herokuapp.com/api/users/new-password",
        data
      )
      .then(res => {
        if (res.data.msg === "Success") {
          this.props.history.push("/login");
        }
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
              Time / <span className="check"> Task </span>
            </h2>
          </div>
          <div className="auth__left-form">
            <form className="form" onSubmit={this.onSubmit}>
              <input type="password" onChange={this.handleChange("password")} />

              <div className="form__log">
                <button type="submit" className="form__log-btn">
                  Setup New Password
                </button>
              </div>
            </form>
          </div>
          <div className="disclaimer">
            <p> 1.0 2019 </p>
          </div>
        </div>
        <div className="auth__right">
          <div className="auth__right-head">
            <h1> New Password </h1>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(NewPassword);
