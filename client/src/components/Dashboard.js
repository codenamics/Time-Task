import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllMonthAndTasks } from "../actions/monthActions";
import { withRouter } from "react-router-dom";
import Loading from "./Loading";
import GridContainer from "./GridContainer";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchAllMonthAndTasks();
  }

  render() {
    const { month, loading } = this.props.month;
    const { email } = this.props.auth.user;

    let dashContent;
    if (month === null || loading) {
      dashContent = <Loading />;
    } else {
      if (month.length > 0) {
        dashContent = <GridContainer email={email} month={month} />;
      } else {
        dashContent = <GridContainer email={email} />;
      }
    }

    return <React.Fragment> {dashContent} </React.Fragment>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  month: PropTypes.object.isRequired,
  fetchAllMonthAndTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  month: state.month,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    fetchAllMonthAndTasks
  }
)(withRouter(Dashboard));
