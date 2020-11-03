// combineReducers 将多个reducer合成一个大的reducer
import { combineReducers } from 'redux';
import autReducer from './autReducer';

export default combineReducers({
	auth: autReducer,
});
