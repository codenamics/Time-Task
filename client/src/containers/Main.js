import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Loading from "../components/Loading";

class Main extends Component {
  render() {
    const { month } = this.props;
    console.log(month);
    let content;
    if (month.loading) {
      content = <Loading />;
    } else {
      content = <Dashboard />;
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  month: state.month
});

export default connect(mapStateToProps)(withRouter(Main));
