import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "../styles/auth.scss";
import InputGroup from "../utils/InputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../actions/authAction";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.errors) {
      return {
        errors: props.errors
      };
    }
    return null;
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(userData, this.props.history);
  };

  render() {
    const { email, password } = this.state;
    const { user } = this.props;
    const { errors } = this.props.errors;
    return (
      <div className="auth">
        <div className="auth__left">
          <div className="auth__left-logo">
            {" "}
            {user ? user.email : null}{" "}
            <h2>
              Time / <span className="check"> Task </span>{" "}
            </h2>{" "}
          </div>{" "}
          <div className="auth__left-form">
            <form className="form" onSubmit={this.onSubmit}>
              <label> Email </label>{" "}
              <InputGroup
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={this.onChange}
              />{" "}
              <label> Password </label>{" "}
              <InputGroup
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.onChange}
              />
              <div className="form__log">
                <button
                  type="submit"
                  className="form__log-btn"
                  onClick={this.handleSubmit}
                >
                  {this.props.title}{" "}
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
            <h1> {this.props.title} </h1>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(withRouter(Register));
