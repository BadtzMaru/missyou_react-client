import React, { Component } from 'react';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CommentForm extends Component {
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
		const { postId } = this.props;
		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
		};
		this.props.addComment(postId, newComment);
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
			<div className='post-form mb-3'>
				<div className='card card-info'>
					<div className='card-header bg-info text-white'>
						请鼓励一下我
					</div>
					<div className='card-body'>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<TextAreaFieldGroup
									placeholder='鼓励鼓励我.'
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
				</div>
			</div>
		);
	}
}

CommentForm.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addComment: PropTypes.func.isRequired,
	postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, {
	addComment,
})(CommentForm);
