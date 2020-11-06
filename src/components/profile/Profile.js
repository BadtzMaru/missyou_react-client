import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import { getProfileByHandle } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import { Link } from 'react-router-dom';

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}
	render() {
		let profileContent;
		const { profile, loading } = this.props.profile;
		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className='row'>
						<div className='col-md-6'>
							<Link
								to='/profiles'
								className='btn btn-light mb-3 float-left'
							>
								返回个人信息
							</Link>
						</div>
						<div className='col-md-6' />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds
						experience={profile.experience}
						education={profile.education}
					/>
					{profile.githubusername ? (
						<ProfileGithub username={profile.githubusername} />
					) : null}
				</div>
			);
		}
		return (
			<div className='profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>{profileContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
