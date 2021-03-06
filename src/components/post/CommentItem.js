import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
	onDeleteClick(postId, commentId) {
		this.props.deleteComment(postId, commentId);
	}
	render() {
		const { comment, postId, auth } = this.props;
		return (
			<div className='card card-body mb-3'>
				<div className='row'>
					<div className='col-md-2'>
						<a href='profile.html'>
							<img
								className='rounded-circle d-nonse d-md-block'
								src={comment.avatar}
								alt='avatar'
							/>
						</a>
						<br />
						<p className='text-center'>{comment.name}</p>
					</div>
					<div className='col-md-10'>
						<p className='lead'>{comment.text}</p>
						{comment.user === auth.user.id ? (
							<button
								type='button'
								className='btn btn-danger mr-1'
								onClick={this.onDeleteClick.bind(
									this,
									postId,
									comment._id
								)}
							>
								删除
							</button>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

CommentItem.propTypes = {
	auth: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
