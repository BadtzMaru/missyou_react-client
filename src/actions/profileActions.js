import axios from 'axios';
import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_PROFILES,
} from './types';

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

// 创建个人信息post数据
export const createProfile = (profileData, history) => (dispatch) => {
	axios
		.post('/api/profile', profileData)
		.then((res) => {
			dispatch({
				type: GET_ERRORS,
				payload: {},
			});
			history.push('/dashboard');
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const clearCurrentProfile = () => ({
	type: CLEAR_CURRENT_PROFILE,
});

// 删除账户
export const deleteAccount = () => (dispatch) => {
	axios
		.delete('/api/profile')
		.then((res) => {
			dispatch({
				type: SET_CURRENT_USER,
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

// 添加个人经历
export const addExperience = (expData, history) => (dispatch) => {
	axios
		.post('/api/profile/experience', expData)
		.then((res) => {
			history.push('/dashboard');
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// 添加教育经历
export const addEducation = (eduData, history) => (dispatch) => {
	axios
		.post('/api/profile/education', eduData)
		.then((res) => {
			history.push('/dashboard');
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// 删除个人履历
export const deleteExperience = (id) => (dispatch) => {
	axios
		.delete(`/api/profile/experience?exp_id=${id}`)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err.response.data);
		});
};

// 删除教育经历
export const deleteEducation = (id) => (dispatch) => {
	axios
		.delete(`/api/profile/education?edu_id=${id}`)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err.response.data);
		});
};

// 获取所有人员信息
export const getProfiles = () => (dispatch) => {
	// 加载动画
	dispatch(setProfileLoading());
	axios
		.get('/api/profile/all')
		.then((res) => {
			dispatch({
				type: GET_PROFILES,
				payload: res.data,
			});
		})
		.catch(() => {
			dispatch({
				type: GET_PROFILES,
				payload: null,
			});
		});
};

// 根据handle获取个人信息
export const getProfileByHandle = (handle) => (dispatch) => {
	// 加载动画
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/handle?handle=${handle}`)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch(() => {
			dispatch({
				type: GET_PROFILE,
				payload: null,
			});
		});
};
