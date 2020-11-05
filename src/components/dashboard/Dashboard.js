import React, { Component } from 'react';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActive from './ProfileActive';

class Dashboard extends Component {
	componentDidMount() {
		// 调用action 请求数据
		this.props.getCurrentProfile();
	}
	onDeleteClick() {
		// 调用action
		this.props.deleteAccount();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent;
		// 判断profile是否为空 或者 loading 是否为真
		if (profile === null || loading === true) {
			dashboardContent = <Spinner />;
		} else {
			// 检查对象中是否有数据
			if (Object.keys(profile).length > 0) {
				// 有数据
				dashboardContent = (
					<div>
						<p className='lead text-muted'>
							Welcome{' '}
							<Link to={`/profile/${profile.handle}`}>
								{user.name}
							</Link>
						</p>
						<ProfileActive />
						{/* 教育经历 & 个人履历 */}
						{/* 删除按钮 */}
						<div style={{ marginBottom: '60px' }}>
							<button
								onClick={this.onDeleteClick.bind(this)}
								className='btn btn-danger'
							>
								删除当前账户
							</button>
						</div>
					</div>
				);
			} else {
				// 用户已经登录但没有任何信息数据
				dashboardContent = (
					<div>
						<p className='lead text-muted'>欢迎 {user.name}</p>
						<p>没有任何相关的个人信息,请添加一些您的个人信息</p>
						<Link
							className='btn btn-lg btn-info'
							to='/create-profile'
						>
							创建个人信息
						</Link>
					</div>
				);
			}
		}
		return (
			<div className='dashboard'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4'>Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
