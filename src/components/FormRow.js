import React from "react";

const FormRow = ({ name, type, handlechange, value, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        className="form-input"
        onChange={(e) => handlechange(e)}
        type={type}
        name={name}
        value={value}
      ></input>
    </div>
  );
};

export default FormRow;
