import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchAllMonthAndTasks } from "../actions/monthActions";
import { withRouter } from "react-router-dom";
import Loading from "./Loading";
import GridContainer from "./GridContainer";

const Dashboard = ({
  fetchAllMonthAndTasks,
  month: { month, loading },
  auth: { user }
}) => {
  useEffect(() => {
    fetchAllMonthAndTasks();
  }, []);

  let dashContent;
  if (month === null || loading) {
    dashContent = <Loading />;
  } else {
    if (month.length > 0) {
      dashContent = <GridContainer email={user.email} month={month} />;
    } else {
      dashContent = <GridContainer email={user.email} />;
    }
  }

  return <Fragment> {dashContent} </Fragment>;
};

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
