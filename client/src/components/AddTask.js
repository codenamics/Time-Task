import React, { useState } from "react";
import { addTasks } from "../actions/tasksAction";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import useReactRouter from "use-react-router";

const AddTask = ({ addTasks }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { history, match } = useReactRouter();

  const onSubmitForm = e => {
    e.preventDefault();

    const data = {
      title,
      description,
      id: match.params
    };
    addTasks(data);
    setTitle('')
    setDescription('')
    history.push('/dashboard')
  };

  return (
    <div className="con-addTask">
      <form className="addTask" onSubmit={onSubmitForm}>
        <label htmlFor=""> Title </label>
        <select name="title" onChange={e => setTitle(e.target.value)}>
          <option value="" disabled selected>
            Select your option
            </option>
          <option value="SDW mapping">SDW mapping</option>
          <option value="CMR study specific-logic">
            CMR study specific-logic
            </option>
          <option value="CMR study specific-programming">
            CMR study specific-programming
            </option>
          <option value="CMR study specific-test scenarion">
            CMR study specific-test scenarion
            </option>
          <option value="CMR study specific-creating test data">
            CMR study specific-creating test data
            </option>
          <option value="ODW mapping">ODW mapping</option>
          <option value="XRR RISC-logic">XRR RISC-logic</option>
          <option value="XRR RISC-programming">XRR RISC-programming</option>
          <option value="XRR RISC-creating test data">
            XRR RISC-creating test data
            </option>
          <option value="XRR RISC-configure file loader">
            XRR RISC-configure file loader
            </option>
        </select>

        <label htmlFor=""> Description </label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
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

}

AddTask.propTypes = {
  addTasks: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    addTasks
  }
)(withRouter(AddTask));
