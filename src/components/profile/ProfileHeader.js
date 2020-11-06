import React, { Component } from 'react';
import isEmpty from '../../validation/isEmpty';
import PropTypes from 'prop-types';

class ProfileHeader extends Component {
	render() {
		const { profile } = this.props;
		return (
			<div className='row'>
				<div className='col-md-12'>
					<div className='card card-body bg-info text-white mb-3'>
						<div className='row'>
							<div className='col-4 col-md-3 m-auto'>
								<img
									className='rounded-circle'
									src={profile.user.avatar}
									alt='avatar'
								/>
							</div>
						</div>
						<div className='text-center'>
							<h1 className='display-4 text-center'>
								{profile.user.name}
							</h1>
							<p className='lead text-center'>
								{profile.status}{' '}
								{isEmpty(profile.company) ? null : (
									<span>{profile.company}</span>
								)}
							</p>
							{isEmpty(profile.location) ? null : (
								<p>{profile.location}</p>
							)}
							<p>
								{isEmpty(profile.website) ? null : (
									<a
										className='text-white p-2'
										href={profile.website}
										target='_blank'
										rel='noopener noreferrer'
									>
										<i className='fa fa-globe fa-2x' />
									</a>
								)}

								{isEmpty(
									profile.social && profile.social.wechat
								) ? null : (
									<span className='text-white p-2'>
										<i className='fa fa-wechat fa-2x' />
									</span>
								)}

								{isEmpty(
									profile.social && profile.social.QQ
								) ? null : (
									<span className='text-white p-2'>
										<i className='fa fa-qq fa-2x' />
									</span>
								)}

								{isEmpty(
									profile.social && profile.social.tengxunkt
								) ? null : (
									<a
										className='text-white p-2'
										href={profile.social.tengxunkt}
										target='_blank'
										rel='noopener noreferrer'
									>
										<i className='fa fa-youtube fa-2x' />
									</a>
								)}

								{isEmpty(
									profile.social && profile.social.wangyikt
								) ? null : (
									<a
										className='text-white p-2'
										href={profile.social.wangyikt}
										target='_blank'
										rel='noopener noreferrer'
									>
										<i className='fa fa-facebook fa-2x' />
									</a>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileHeader.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileHeader;
