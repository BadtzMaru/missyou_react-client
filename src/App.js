import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Provider在根组件外层包了一层,这样App的所有子组件就默认都可以拿到state了
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	// 解析token
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));
	// 检测token是否过期
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className='app'>
						<Navbar />
						<Route path='/' component={Landing} exact />
						<div className='container'>
							<Route path='/login' component={Login} exact />
							<Route
								path='/register'
								component={Register}
								exact
							/>
							<PrivateRoute
								exact
								path='/dashboard'
								component={Dashboard}
							/>
							<PrivateRoute
								exact
								path='/create-profile'
								component={CreateProfile}
							/>
							<PrivateRoute
								exact
								path='/edit-profile'
								component={EditProfile}
							/>
							<PrivateRoute
								exact
								path='/add-experience'
								component={AddExperience}
							/>
							<PrivateRoute
								exact
								path='/add-education'
								component={AddEducation}
							/>
							<Route
								exact
								path='/profiles'
								component={Profiles}
							/>
							<Route
								exact
								path='/profile/:handle'
								component={Profile}
							/>
							<PrivateRoute
								exact
								path='/feed'
								component={Posts}
							/>
							<PrivateRoute
								exact
								path='/post/:id'
								component={Post}
							/>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
