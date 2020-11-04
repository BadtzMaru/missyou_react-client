import React, { Component } from 'react';
import { loginUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {},
		};
	}
	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	onSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			email: this.state.email,
			password: this.state.password,
		};
		// 调用action
		this.props.loginUser(newUser);
	};
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}
	render() {
		const { errors } = this.state;
		return (
			<div className='login'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>登录</h1>
							<p className='lead text-center'>用正确的账号登录</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type='email'
									placeholder='邮箱地址'
									name='email'
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
								/>
								<TextFieldGroup
									type='password'
									placeholder='密码'
									name='password'
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>
								<input
									type='submit'
									className='btn btn-info btn-block mt-4'
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
