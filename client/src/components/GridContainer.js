import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllMonthAndTasks, filterMonth } from "../actions/monthActions";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/authAction";
import MonthRow from "../components/MonthRow";
import { withRouter } from "react-router-dom";

class GridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "January"
    };
  }
  logout = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/login");
  };
  clearFilter = () => {
    this.props.fetchAllMonthAndTasks();
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  filterMonth = e => {
    const data = {
      search: this.state.search
    };
    this.props.filterMonth(data, this.props);
  };
  render() {
    const options = [
      { value: "January" },
      { value: "February" },
      { value: "March" },
      { value: "April" },
      { value: "May" },
      { value: "June" },
      { value: "July" },
      { value: "August" },
      { value: "September" },
      { value: "October" },
      { value: "November" },
      { value: "December" }
    ];
    const { email, month } = this.props;
    return (
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
            <input
              name="search"
              type="text"
              className="search"
              placeholder="Search..."
            />
            <ul className="nav__content-items">
              <li>
                <button className="form__log-btn "> Report Issue </button>
              </li>
              <li>
                <span className="name"> {email} </span>
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
              <span className="main__top-left--2">You are in main panel</span>
            </div>
            <select
              name="search"
              onChange={this.onChange}
              value={this.state.search}
            >
              {options.map(option => (
                <option value={option.value}>{option.value}</option>
              ))}
            </select>
            <button className="form__log-btn " onClick={this.filterMonth}>
              Filter
            </button>
            <button className="form__log-btn " onClick={this.clearFilter}>
              Clear Filter
            </button>
            <Link to="/addMonth" className="form__log-btn ">
              Add New Month
            </Link>
          </div>

          {month ? (
            month.map(monthItem => {
              return <MonthRow key={monthItem._id} monthItem={monthItem} />;
            })
          ) : (
            <p className="no-tasks"> You have no tasks </p>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    fetchAllMonthAndTasks,
    logoutUser,
    filterMonth
  }
)(withRouter(GridContainer));
