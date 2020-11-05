import React, { Component } from 'react';
import { getProfiles } from '../../actions/profileActions';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import PropTypes from 'prop-types';

class Profiles extends Component {
	// 获取数据
	componentDidMount() {
		// 调用action
		this.props.getProfiles();
	}
	render() {
		const { profiles, loading } = this.props.profile;
		let profileItems;
		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = <h1>开发人员相关信息</h1>;
			} else {
				profileItems = <h4>没有任何相关开发人员信息</h4>;
			}
		}
		return (
			<div className='profiles'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4 text-center'>
								开发人员信息
							</h1>
							<p className='lead text-center'>
								查看相关开发人员信息
							</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
