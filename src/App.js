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
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
