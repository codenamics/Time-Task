import React, { useState, useEffect } from "react";
import { addMonth } from "../actions/monthActions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import useReactRouter from "use-react-router";

const AddMonth = ({ addMonth }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const { history } = useReactRouter();

  const onSubmitForm = e => {
    e.preventDefault();
    const data = {
      name,
      year
    };
    addMonth(data, history);
    setName("");
    setYear("");
  };

  return (
    <div className="con-addTask">
      <form className="addTask" onSubmit={onSubmitForm}>
        <label htmlFor=""> Month </label>
        <input
          type="text"
          onChange={e => setName(e.target.value)}
          name="name"
          value={name}
        />
        <label htmlFor=""> Year </label>
        <input
          type="text"
          onChange={e => setYear(e.target.value)}
          name="year"
          value={year}
        />
        <button type="submit" className="form__log-btn">
          Add
        </button>
      </form>
      <Link className="form__log-btn" to="/dashboard">
        Back
      </Link>
    </div>
  );
};

AddMonth.propTypes = {
  addMonth: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    addMonth
  }
)(withRouter(AddMonth));
