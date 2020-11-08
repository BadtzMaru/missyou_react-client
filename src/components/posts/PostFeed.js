import React, { Component } from 'react';
import PostItem from './PostItem';
import PropTypes from 'prop-types';

class postFeed extends Component {
	render() {
		const { posts } = this.props;
		return posts.map((post) => <PostItem key={post._id} post={post} />);
	}
}

postFeed.propTypes = {
	post: PropTypes.array,
};

export default postFeed;
