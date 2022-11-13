import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Frame from './components/Frame';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';

import { GameSettingsContext, useLevels, useTimer } from './utils';

const Router = () => {
	const levelsManager = useLevels();
	const timer = useTimer();
	return (
		<div className='container-fluid p-0'>
			<GameSettingsContext.Provider value={{ levelsManager, timer }}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Frame />}>
							<Route index element={<Home />} />
							<Route path='leaderboard' element={<Leaderboard />} />
							<Route path='game:stringLevelId' element={<Game />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</GameSettingsContext.Provider>
		</div>
	);
};

export default Router;
