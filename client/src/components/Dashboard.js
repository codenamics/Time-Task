import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllMonthAndTasks, filterMonth } from "../actions/monthActions";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/authAction";
import MonthRow from "../components/MonthRow";
import { withRouter } from "react-router-dom";
import Loading from "./Loading";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
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
  componentDidMount() {
    this.props.fetchAllMonthAndTasks();
  }
  clearFilter = () => {
    this.props.fetchAllMonthAndTasks();
  };
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
                  <span className="main__top-left--2">
                    You are in main panel
                  </span>
                </div>
                <select
                  name="search"
                  onChange={this.onChange}
                  value={this.state.search}
                >
                  <option selected disabled>
                    Filter by month
                  </option>
                  <option value="January">January</option>
                  <option value="February"> February </option>
                  <option value="March"> March </option>
                  <option value="April"> April </option>
                  <option value="May"> May </option>
                  <option value="June"> June </option>
                  <option value="July"> July </option>
                  <option value="August"> August </option>
                  <option value="September"> September </option>
                  <option value="October"> October </option>
                  <option value="November"> November </option>
                  <option value="December"> December </option>
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
                <select
                  name="search"
                  onChange={this.onChange}
                  value={this.state.search}
                >
                  <option selected disabled>
                    Filter by month
                  </option>
                  <option value="January">January</option>
                  <option value="February"> February </option>
                  <option value="March"> March </option>
                  <option value="April"> April </option>
                  <option value="May"> May </option>
                  <option value="June"> June </option>
                  <option value="July"> July </option>
                  <option value="August"> August </option>
                  <option value="September"> September </option>
                  <option value="October"> October </option>
                  <option value="November"> November </option>
                  <option value="December"> December </option>
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
    logoutUser,
    filterMonth
  }
)(withRouter(Dashboard));
