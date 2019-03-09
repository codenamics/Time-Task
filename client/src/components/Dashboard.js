import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllMonthAndTasks } from "../actions/monthActions";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/authAction";
import MonthRow from "../components/MonthRow";
import { withRouter } from "react-router-dom";
import Loading from "./Loading";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchAllMonthAndTasks();
  }
  logout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/login");
  };
  render() {
    const { month, loading } = this.props.month;
    const { email } = this.props.auth.user;

    let dashContent;
    if (month === null || loading) {
      dashContent = <Loading />;
    } else {
      if (month.length > 0) {
        dashContent = (
          <div className="grid-con">
            <div className="sidebar">
              <ul className="sidebar__menu">
                <li>
                  <Link to="/" className="sidebar__menu-item">
                    <i className="fas fa-home" />
                    <span> Dashboard </span>
                  </Link>
                </li>
                <li>
                  <Link to="/health" className="sidebar__menu-item">
                    <i className="fas fa-heart" />
                    <span> placeholder </span>
                  </Link>
                </li>
                <li>
                  <Link to="/training" className="sidebar__menu-item">
                    <i className="fas fa-football-ball" />
                    <span> placeholder </span>
                  </Link>
                </li>
                <li>
                  <Link to="/notes" className="sidebar__menu-item">
                    <i className="fas fa-utensils" />
                    <span> placehder </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav">
              <div className="nav__logo">
                <i className="far fa-clock" />

                <span className="nav__logo-line" />
              </div>
              <div className="nav__content">
                <input type="text" className="search" placeholder="Search..." />
                <ul className="nav__content-items">
                  <li>
                    <a href="http://" className="form__log-btn ">
                      Report Issue
                    </a>
                  </li>
                  <li>
                    <span className="name">{email}</span>
                  </li>
                  <li>
                    <button className="logout" onClick={this.logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="main">
              <div className="main__top">
                <div className="main__top-left">
                  <span className="main__top-left--1 check"> Dashboard </span>
                  <span className="main__top-left--2">
                    You are in main panel
                  </span>
                </div>
                <Link to="/addMonth" className="form__log-btn ">
                  Add New Month
                </Link>
              </div>
              {month.map(monthItem => {
                return <MonthRow key={monthItem._id} monthItem={monthItem} />;
              })}
            </div>
          </div>
        );
      } else {
        dashContent = (
          <div className="grid-con">
            <div className="sidebar">
              <ul className="sidebar__menu">
                <li>
                  <Link to="/" className="sidebar__menu-item">
                    <i className="fas fa-home" />
                    <span> Dashboard </span>
                  </Link>
                </li>
                <li>
                  <Link to="/health" className="sidebar__menu-item">
                    <i className="fas fa-heart" />
                    <span> placeholder </span>
                  </Link>
                </li>
                <li>
                  <Link to="/training" className="sidebar__menu-item">
                    <i className="fas fa-football-ball" />
                    <span> placeholder </span>
                  </Link>
                </li>
                <li>
                  <Link to="/notes" className="sidebar__menu-item">
                    <i className="fas fa-utensils" />
                    <span> placehder </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="nav">
              <div className="nav__logo">
                <i className="far fa-clock" />

                <span className="nav__logo-line" />
              </div>
              <div className="nav__content">
                <input type="text" className="search" placeholder="Search..." />
                <ul className="nav__content-items">
                  <li>
                    <a href="http://" className="form__log-btn ">
                      Report Issue
                    </a>
                  </li>
                  <li>
                    <span className="name" />
                  </li>
                  <li>
                    <button className="logout" onClick={this.logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="main">
              <div className="main__top">
                <div className="main__top-left">
                  <span className="main__top-left--1 check"> Dashboard </span>
                  <span className="main__top-left--2">
                    You are in main panel
                  </span>
                </div>
                <Link to="/addMonth" className="form__log-btn ">
                  Add New Month
                </Link>
              </div>
              <p className="no-tasks"> You have no tasks </p>
            </div>
          </div>
        );
      }
    }

    return <React.Fragment> {dashContent} </React.Fragment>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  month: PropTypes.object.isRequired,
  fetchAllMonthAndTasks: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  month: state.month,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    fetchAllMonthAndTasks,
    logoutUser
  }
)(withRouter(Dashboard));
