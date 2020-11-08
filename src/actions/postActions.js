import axios from 'axios';
import {
	ADD_POST,
	GET_POSTS,
	DELETE_POST,
	POST_LOADING,
	GET_ERRORS,
	GET_POST,
} from './types';

// 添加评论
export const addPost = (postData) => (dispatch) => {
	axios
		.post('/api/posts/', postData)
		.then((res) => {
			dispatch({
				type: ADD_POST,
				payload: res.data,
			});
			dispatch({
				type: GET_ERRORS,
				payload: {},
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// 加载动画
export const setPostLoading = () => {
	return {
		type: POST_LOADING,
	};
};

// 请求评论
export const getPosts = () => (dispatch) => {
	dispatch(setPostLoading);
	axios
		.get('/api/posts/all')
		.then((res) => {
			dispatch({
				type: GET_POSTS,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_POSTS,
				payload: null,
			});
		});
};

// 删除评论
export const deletePost = (id) => (dispatch) => {
	axios
		.delete(`/api/posts?id=${id}`)
		.then((res) => {
			dispatch({
				type: DELETE_POST,
				payload: id,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// 添加点赞
export const addLike = (id) => (dispatch) => {
	axios
		.post(`api/posts/like?id=${id}`)
		.then((res) => {
			dispatch(getPosts());
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// 取消点赞
export const removeLike = (id) => (dispatch) => {
	axios
		.post(`api/posts/unlike?id=${id}`)
		.then((res) => {
			dispatch(getPosts());
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// 获取单个评论
export const getPost = (id) => (dispatch) => {
	dispatch(setPostLoading);
	axios
		.get(`/api/posts?id=${id}`)
		.then((res) => {
			dispatch({
				type: GET_POST,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_POST,
				payload: null,
			});
		});
};

// 添加留言
export const addComment = (postId, commentData) => (dispatch) => {
	axios
		.post(`/api/posts/comment?id=${postId}`, commentData)
		.then((res) => {
			dispatch({
				type: GET_POST,
				payload: res.data,
			});
			dispatch({
				type: GET_ERRORS,
				payload: {},
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// 删除留言
export const deleteComment = (postId, commentId) => (dispatch) => {
	axios
		.delete(`/api/posts/comment?id=${postId}&comment_id=${commentId}`)
		.then((res) => {
			dispatch({
				type: GET_POST,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};
