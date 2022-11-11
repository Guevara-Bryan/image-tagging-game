import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Frame from './components/Frame';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';

import { GameSettingsContext, Level, EMPTY_LEVEL } from './utils';

const Router = () => {
	const [levelSettings, setLevelSettings] = React.useState<Level>(EMPTY_LEVEL);

	return (
		<div className='container-fluid p-0'>
			<GameSettingsContext.Provider
				value={{
					level: levelSettings,
					setter: setLevelSettings,
				}}
			>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Frame />}>
							<Route index element={<Home />} />
							<Route path='leaderboard' element={<Leaderboard />} />
							<Route path='game' element={<Game />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</GameSettingsContext.Provider>
		</div>
	);
};

export default Router;
