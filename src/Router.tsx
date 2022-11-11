import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Frame from './components/Frame';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';

const Router = () => {
	return (
		<div className='container-fluid p-0'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Frame />}>
						<Route index element={<Home />} />
						<Route path='leaderboard' element={<Leaderboard />} />
						<Route path='game' element={<Game />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default Router;
