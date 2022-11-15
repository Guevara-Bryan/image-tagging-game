import React from 'react';
import { Link } from 'react-router-dom';
import { GameSettings } from '../types';
import { GameSettingsContext } from '../utils';

const NavBar = () => {
	const currentSettings = React.useContext<GameSettings>(GameSettingsContext);
	const cleanUpLevels = () => {
		currentSettings.timer?.stopTimer();
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark px-lg-5 fixed-top'>
			<div className='container-fluid'>
				<Link
					to='/'
					className='navbar-brand'
					onClick={() => {
						cleanUpLevels();
					}}
				>
					Where's Waldo
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNavAltMarkup'
					onClick={(e: React.MouseEvent<HTMLElement>) => {
						e.stopPropagation();
					}}
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
					<div className='navbar-nav'>
						<Link
							to='/'
							className='nav-link'
							onClick={() => {
								cleanUpLevels();
							}}
						>
							Home
						</Link>
						<Link
							to='leaderboard'
							className='nav-link'
							onClick={() => {
								cleanUpLevels();
							}}
						>
							Leaderboard
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
