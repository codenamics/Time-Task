import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <Link to="/login" className="form__log-btn">
        {" "}
        Login{" "}
      </Link>{" "}
      <Link to="/register" className="form__log-btn mr-10">
        {" "}
        Register{" "}
      </Link>{" "}
    </div>
  );
}
