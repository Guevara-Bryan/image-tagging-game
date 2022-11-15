import React from 'react';
import { Level } from '../types';
import { useNavigate } from 'react-router-dom';

import '../styles/LevelView.css';

interface LevelViewProps {
	level: Level;
	resetLevels: () => void;
}

const LevelView = ({ level, resetLevels }: LevelViewProps) => {
	const navigate = useNavigate();

	const startLevel = (): void => {
		resetLevels();
		navigate(`/game:${level.id}`);
	};

	return (
		<div className='level-view'>
			<div className='level__image-container'>
				<img className='level-image' src={level.thumbnail} alt='' />
			</div>
			<div className='level-name'>{level.name}</div>
			<button type='button' className='btn btn-dark py-2' onClick={startLevel}>
				Start
			</button>
		</div>
	);
};

export default LevelView;
