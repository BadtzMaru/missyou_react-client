import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING } from './types';

const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};

export const getCurrentProfile = () => (dispatch) => {
	// 加载动画
	dispatch(setProfileLoading());
	// 请求数据
	axios('/api/profile')
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch(() => {
			dispatch({
				type: GET_PROFILE,
				payload: {},
			});
		});
};
