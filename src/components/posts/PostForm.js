import React, { Component } from 'react';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {},
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	onSubmit(e) {
		e.preventDefault();
		const { user } = this.props.auth;
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		this.props.addPost(newPost);
		this.setState({
			text: '',
		});
	}
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}
	render() {
		const { errors } = this.state;
		return (
			<div className='card-body'>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<TextAreaFieldGroup
							placeholder='留言说点.'
							name='text'
							value={this.state.text}
							onChange={this.onChange}
							error={errors.text}
						/>
					</div>
					<button className='btn btn-dark' type='submit'>
						提交
					</button>
				</form>
			</div>
		);
	}
}

PostForm.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, {
	addPost,
})(PostForm);
