import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from './NavBar';

const Frame = () => {
	return (
		<div className='container-fluid p-0'>
			<NavBar />
			<div className='container-fluid p-0 mt-5 pt-1'>
				<Outlet />
			</div>
		</div>
	);
};

export default Frame;
