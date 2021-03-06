import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "../styles/auth.scss";
import InputGroup from "../utils/InputGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../actions/authAction";

class Login extends Component {
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
      this.props.history.push("/dashboard");
    }
  }
  static getDerivedStateFromProps(props, state) {
    const { isAuthenticated } = props.auth;
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
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
    const { email, password } = this.state;
    let userData = {
      email,
      password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { email, password } = this.state;
    const { title } = this.props;
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
              <label> Email </label>
              <InputGroup
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={this.onChange}
              />
              <label> Password </label>
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
                  {title}
                </button>

                <Link className="form__log-btn" to="/reset">
                  Forgot Password ?
                </Link>
              </div>
            </form>
          </div>
          <div className="disclaimer">
            <p> 1.0 2019 </p>
          </div>
        </div>
        <div className="auth__right">
          <div className="auth__right-head">
            <h1> {title} </h1>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(withRouter(Login));
