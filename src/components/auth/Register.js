import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';

/*
	react-redux 的两个最主要的功能
	connect: 用于从UI组建生成容器组建,将两种组件连起来
	Provider: 可以让组件及子组件拿到state
*/

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
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
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		};
		// 调用action
		this.props.registerUser(newUser, this.props.history);
	};
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}
	render() {
		const { errors } = this.state;
		return (
			<div className='register'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>注册</h1>
							<p className='lead text-center'>创建新的账户</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder='用户名'
									name='name'
									value={this.state.name}
									onChange={this.onChange}
									error={errors.name}
								/>
								<TextFieldGroup
									type='email'
									placeholder='邮箱地址'
									name='name'
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
									info='我们使用了gravatar全球公认头像,如果需要有头像显示,请使用gravatar注册邮箱'
								/>
								<TextFieldGroup
									type='password'
									placeholder='密码'
									name='password'
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>
								<TextFieldGroup
									type='password'
									placeholder='确认密码'
									name='password2'
									value={this.state.password2}
									onChange={this.onChange}
									error={errors.password2}
								/>
								<input
									type='submit'
									className='btn btn-info btn-block mt-4'
									value='提交'
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

// 将状态映射为属性
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
