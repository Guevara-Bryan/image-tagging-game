import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, GameSettings, Level } from '../utils';

import beachMap from '../images/beach-map.jpeg';
import snowMap from '../images/snow-map.jpeg';

import { GameSettingsContext } from '../utils';

const Home = () => {
	const GameSettings: GameSettings = React.useContext<GameSettings>(GameSettingsContext);
  const navigate = useNavigate();
	const levels: Level[] = [
		{
			id: 1,
			name: 'Snow Map',
			imageSrc: snowMap,
			targets: [
				{
					name: 'Odd Waldo',
					coordinates: { x: 951, y: 1262 },
				},
				{
					name: 'Waldo',
					coordinates: { x: 2567, y: 1458 },
				},
			],
		},
		{
			id: 2,
			name: 'Beach Map',
			imageSrc: beachMap,
			targets: [
				{
					name: 'Odd Waldo',
					coordinates: { x: 413, y: 830 },
				},
				{
					name: 'Wizard',
					coordinates: { x: 1037, y: 830 },
				},
				{
					name: 'Waldo',
					coordinates: { x: 2373, y: 882 },
				},
			],
		},
	];
	return (
		<div className='container-fluid p-0'>
			<h1>Welcome to Where's Waldo</h1>
			<h2>Please Select Your Level</h2>
			{levels.map((level: Level) => {
				return (
					<div
						onClick={() => {
							GameSettings.setter(level);
              navigate('/game');
						}}
					>
						<h3>{level.name}</h3>
					</div>
				);
			})}
		</div>
	);
};

export default Home;
