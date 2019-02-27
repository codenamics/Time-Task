import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllMonthAndTasks } from "../actions/monthActions";

import { Link } from "react-router-dom";
import { logoutUser } from "../actions/authAction";
import MonthRow from "../components/MonthRow";

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

    let monthItems;
    if (month === null || loading) {
      monthItems = <p> Loading </p>;
    } else {
      if (month.length > 0) {
        monthItems = month.map(monthItem => (
          <MonthRow key={monthItem._id} monthItem={monthItem} />
        ));
      } else {
        monthItems = <h4> You have no tasks </h4>;
      }
    }

    return (
      <div className="grid-con">
        <div className="sidebar">
          <ul className="sidebar__menu">
            <li>
              <Link to="/" className="sidebar__menu-item">
                <i className="fas fa-home" />
                <span> Dashboard </span>{" "}
              </Link>{" "}
            </li>{" "}
            <li>
              <Link to="/health" className="sidebar__menu-item">
                <i className="fas fa-heart" />
                <span> placeholder </span>{" "}
              </Link>{" "}
            </li>{" "}
            <li>
              <Link to="/training" className="sidebar__menu-item">
                <i className="fas fa-football-ball" />
                <span> placeholder </span>{" "}
              </Link>{" "}
            </li>{" "}
            <li>
              <Link to="/notes" className="sidebar__menu-item">
                <i className="fas fa-utensils" />
                <span> placeholder </span>{" "}
              </Link>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div className="nav">
          <div className="nav__logo">
            <i className="far fa-clock" />

            <span className="nav__logo-line" />
          </div>{" "}
          <div className="nav__content">
            <input type="text" className="search" placeholder="Search..." />
            <ul className="nav__content-items">
              <li>
                <a href="http://" className="form__log-btn ">
                  Report Issue{" "}
                </a>{" "}
              </li>{" "}
              <li>
                <span className="name" />
              </li>{" "}
              <li>
                <button className="logout" onClick={this.logout}>
                  Logout{" "}
                </button>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
        <div className="main">
          <div className="main__top">
            <div className="main__top-left">
              <span className="main__top-left--1 check"> Dashboard </span>{" "}
              <span className="main__top-left--2"> You are in main panel </span>{" "}
            </div>{" "}
            <Link to="/addMonth" className="form__log-btn ">
              Add New Month{" "}
            </Link>{" "}
          </div>{" "}
          {monthItems}{" "}
        </div>{" "}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  month: state.month
});

export default connect(
  mapStateToProps,
  {
    fetchAllMonthAndTasks,
    logoutUser
  }
)(Dashboard);
