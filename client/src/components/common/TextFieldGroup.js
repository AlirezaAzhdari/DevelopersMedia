import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  value,
  placeholder,
  error,
  label,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group text-right">
      <input
        type={type}
        className={classnames("form-control form-control-lg text-right", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {label && <label className="form-check-label text-right">{label}</label>}
      {info && (
        <small className="form-text text-muted text-right">{info}</small>
      )}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  info: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
