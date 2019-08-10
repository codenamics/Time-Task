import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Loading from "../components/Loading";

const Main = ({ month }) => {
  let content;
  if (month.loading) {
    content = <Loading />;
  } else {
    content = <Dashboard />;
  }
  return (<React.Fragment>{content}</React.Fragment>);
}

const mapStateToProps = state => ({
  month: state.month
});

export default connect(mapStateToProps)(withRouter(Main));
