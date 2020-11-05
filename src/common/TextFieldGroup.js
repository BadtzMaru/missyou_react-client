import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	type,
	onChange,
	disabled,
}) => (
	<div className='form-group'>
		<input
			type={type}
			className={classnames('form-control form-control-lg', {
				'is-invalid': error,
			})}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
		/>
		{info && <small className='form-text text-muted'>{info}</small>}
		{error && <div className='invalid-feedback'>{error}</div>}
	</div>
);

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
	type: 'text',
};

export default TextFieldGroup;
