import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({ name, placeholder, value, onChange, type }) => {
  return (
    <React.Fragment>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />{" "}
    </React.Fragment>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};
InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
