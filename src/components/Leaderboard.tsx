import React from 'react';

import '../styles/Leaderboard.css';

const Leaderboard = () => {
	// TODO: Add firebase functionality
	const players: { name: string; time: string }[] = [
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
		{ name: 'John Doe', time: '00:05:31' },
	];
	return (
		<div className='container-fluid p-0 d-flex justify-content-center flex-column align-items-center bg-warning'>
			<div className='h1'>Leaderboard</div>
			<div className='players-container bg-dark'>
				{players.map((player, index) => {
					return (
						<div key={index} className='player-entry text-bg-dark'>
							<div>{player.name}</div>
							<div>{player.time}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Leaderboard;
