import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllMonthAndTasks } from "../actions/tasksAction";
import TaskRow from "./TaskRow";
import AddTask from "./AddTask";
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
    const { tasks, loading } = this.props.tasks;
    console.log(tasks);
    let monthItems;
    if (tasks === null || loading) {
      monthItems = <p> Loading </p>;
    } else {
      if (tasks.length > 0) {
        monthItems = tasks.map(task => <MonthRow key={task._id} task={task} />);
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
                <i class="fas fa-home" />
                <span> Dashboard </span>
              </Link>
            </li>
            <li>
              <Link to="/health" className="sidebar__menu-item">
                <i class="fas fa-heart" />
                <span> placeholder </span>
              </Link>
            </li>
            <li>
              <Link to="/training" className="sidebar__menu-item">
                <i class="fas fa-football-ball" />
                <span> placeholder </span>
              </Link>
            </li>
            <li>
              <Link to="/notes" className="sidebar__menu-item">
                <i class="fas fa-utensils" />
                <span> placeholder </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav">
          <div className="nav__logo">
            <i class="far fa-clock" />

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
        <div class="main">
          <div className="main__top">
            <div className="main__top-left">
              <span className="main__top-left--1 check"> Dashboard </span>
              <span className="main__top-left--2"> You are in main panel </span>
            </div>
            <a href="http://" className="form__log-btn ">
              Add New Month
            </a>
          </div>
          {monthItems}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tasks: state.tasks
});

export default connect(
  mapStateToProps,
  {
    fetchAllMonthAndTasks,
    logoutUser
  }
)(Dashboard);
