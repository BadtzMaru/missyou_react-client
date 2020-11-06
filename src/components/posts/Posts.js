import React, { Component } from 'react';
import PostForm from './PostForm';
import { getPosts } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}
	render() {
		return (
			<div className='feed'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							{/* 展示评论表单 */}
							<PostForm />
							{/* 展示点赞内容 */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
