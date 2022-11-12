import React from 'react';
import { Level, GameSettingsContext, GameLevelsManager } from '../utils';

import LevelView from './LevelView';

const Home = () => {
	const levelsManager: GameLevelsManager = React.useContext<GameLevelsManager>(GameSettingsContext);

	return (
		<div className='container-fluid p-0 home-container'>
			<div className='d-flex h1 align-center justify-content-center align-items-center py-2'>
				Select Your Level
			</div>
			<div className='levels-container'>
				{levelsManager.getAllLevels().map((level: Level) => {
					return <LevelView key={level.id} level={level} />;
				})}
			</div>
		</div>
	);
};

export default Home;
