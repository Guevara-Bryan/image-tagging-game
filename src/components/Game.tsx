import React from 'react';
import snowMap from '../images/snow-map.jpeg';
import Pointer from './Pointer';

import { Target, isCircleCollision } from '../collisions';

const Game = () => {
	const pointerRef = React.useRef<HTMLDivElement>(null);
	const pointerRadius = 37.5; // pixels
	const targets: Target[] = [
		{
			name: 'Odd Waldo',
			coordinates: { x: 951, y: 1262 },
		},
		{
			name: 'Waldo',
			coordinates: { x: 2567, y: 1458 },
		},
	];

	const onMouseMove = (e: MouseEvent): void => {
		if (pointerRef.current === null) return;
		pointerRef.current.style.left = `${e.pageX - window.scrollX - pointerRadius}px`;
		pointerRef.current.style.top = `${e.pageY - window.scrollY - pointerRadius}px`;
	};

	const pointerOnClick = (e: React.MouseEvent): void => {
		for (const target of targets) {
			if (
				isCircleCollision(
					{
						center: target.coordinates,
						radius: pointerRadius,
					},
					{
						center: { x: e.pageX, y: e.pageY },
						radius: pointerRadius,
					}
				)
			) {
				alert(`Congrats!! You found ${target.name}`);
				break;
			}
		}
	};

	React.useEffect(() => {
		window.addEventListener('mousemove', onMouseMove);
		return () => {
			window.removeEventListener('mousedown', onMouseMove);
		};
	}, []);

	return (
		<div className='container-fluid p-0'>
			<div className='row position-fixed container-fluid p-0 mx-0'>
				<div
					className='
          offset-sm-4
          col-sm-4
          offset-md-5
          col-md-2
          bg-dark
          text-bg-dark
          text-center
          p-2'
					style={{ borderRadius: '0 0 10px 10px', cursor: 'default' }}
				>
					00:00:00
				</div>
			</div>
			<div className='container-fluid p-0'>
				<Pointer ref={pointerRef} onclick={pointerOnClick} />
				<img src={snowMap} alt='' />
			</div>
		</div>
	);
};

export default Game;
