import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark px-lg-5 fixed-top'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand'>
					Image Game
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
						<Link to='/' className='nav-link'>
							Home
						</Link>
						<Link to='leaderboard' className='nav-link'>
							Leaderboard
						</Link>
						<Link to='game' className='nav-link'>
							Game
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;