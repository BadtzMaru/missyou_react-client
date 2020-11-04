import React, { Component } from 'react';
import { getCurrentProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends Component {
	componentDidMount() {
		// 调用action 请求数据
		this.props.getCurrentProfile();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let dashboardContent;
		// 判断profile是否为空 或者 loading 是否为真
		if (profile === null || loading === true) {
			dashboardContent = <h4>加载动画!</h4>;
		} else {
			dashboardContent = <h1>Hello World!</h1>;
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
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
