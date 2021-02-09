import React, { Component } from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    type,
    onChange,
    disabled
}) => {
    return (
        <div>
            <input
                type={type}
                name={name}
                className={classnames('login-input', { 'login-input-invalid': error })}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error.username && (<label className="errorlabel">{error.username}</label>)}

        </div>
    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
    disabled: PropTypes.string,
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;