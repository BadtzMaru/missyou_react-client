import axios from 'axios';
import {
	ADD_POST,
	GET_POSTS,
	DELETE_POST,
	POST_LOADING,
	GET_ERRORS,
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
