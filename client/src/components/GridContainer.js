import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllMonthAndTasks, filterMonth } from "../actions/monthActions";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/authAction";
import MonthRow from "../components/MonthRow";
import { withRouter } from "react-router-dom";
import useReactRouter from "use-react-router";

const GridContainer = ({
  logoutUser,
  fetchAllMonthAndTasks,
  filterMonth,
  email,
  month
}) => {
  const [search, setSearch] = useState("January");
  const { history } = useReactRouter();

  const logout = e => {
    e.preventDefault();
    logoutUser();
    history.push("/login");
  };

  const clearFilter = () => {
    fetchAllMonthAndTasks();
  };

  const filterMonthAction = e => {
    const data = {
      search
    };
    filterMonth(data, history);
  };

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
              <span> placeholder</span>
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
              <button className="logout" onClick={logout}>
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
            onChange={e => setSearch(e.target.value)}
            value={search}
          >
            {options.map(option => (
              <option value={option.value}>{option.value}</option>
            ))}
          </select>
          <button className="form__log-btn " onClick={filterMonthAction}>
            Filter
          </button>
          <button className="form__log-btn form__log-btn-red" onClick={clearFilter}>
            Clear Filter
          </button>
          <Link to="/addMonth" className="form__log-btn green">
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
};

export default connect(
  null,
  {
    fetchAllMonthAndTasks,
    logoutUser,
    filterMonth
  }
)(withRouter(GridContainer));
