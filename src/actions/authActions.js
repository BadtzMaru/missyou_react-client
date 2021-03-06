import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => (dispatch) => {
	// 发起请求;
	axios
		.post('/api/users/register', userData)
		.then((res) => {
			history.push('/login');
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// 登录
export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/users/login', userData)
		.then((res) => {
			const { token } = res.data;
			// 存储token到localStorage
			localStorage.setItem('jwtToken', token);
			// 设置axios的headers token
			setAuthToken(token);
			// 解析token
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// 退出
export const logoutUser = () => (dispatch) => {
	// 删除localStorage
	localStorage.removeItem('jwtToken');
	// 干掉请求头
	setAuthToken(false);
	// 连接reducer
	dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};
