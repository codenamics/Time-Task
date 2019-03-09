import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Con = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;

function Loading() {
  return (
    <Con>
      <div class="lds-css ng-scope">
        <div class="lds-pacman">
          <div>
            <div />
            <div />
            <div />
          </div>
          <div>
            <div />
            <div />
          </div>
        </div>
      </div>
    </Con>
  );
}

export default withRouter(Loading);
