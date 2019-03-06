import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Con = styled.div`
  background-color: #6772e5;
  width: 100%;
  height: 100vh;
  padding-top: 150px;
`;
class SuccessfulPay extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/dashboard");
    }, 2000);
  }

  render() {
    return (
      <Con>
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>{" "}
      </Con>
    );
  }
}

export default withRouter(SuccessfulPay);
