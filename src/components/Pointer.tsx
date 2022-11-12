import React from 'react';
import pointer from '../images/crosshair.png';

import {
	GameSettingsContext,
	GameLevelsManager,
	Target,
	Point,
	isCircleCollision,
	Circle,
	POINTER_RADIUS,
} from '../utils';

interface PointerProps {
	visible: boolean;
	setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
	currentLevel: number;
}

const Pointer = React.forwardRef<HTMLDivElement, PointerProps>(
	({ visible, setVisibility, currentLevel }, ref) => {
		const levelsManager: GameLevelsManager = React.useContext(GameSettingsContext);
		const [pointerCenter, setPointerCenter] = React.useState<Point>({ x: 0, y: 0 });

		const clickAction = (e: React.MouseEvent): void => {
			setVisibility((prev) => !prev);
			setPointerCenter({ x: e.pageX, y: e.pageY });
		};

		const characterClickAction = (character: Target): void => {
			console.log(pointerCenter);
			setVisibility(false);
			const targetCirlce: Circle = {
				center: character.coordinates,
				radius: POINTER_RADIUS,
			};
			const pointerCircle: Circle = {
				center: pointerCenter,
				radius: POINTER_RADIUS,
			};
			if (isCircleCollision(targetCirlce, pointerCircle)) {
				levelsManager.removeCharacterFromLevel(currentLevel, character.name);
				alert(`Congrats. You found ${character.name}`);
			} else {
				alert(`That is not ${character.name}`);
			}
		};

		return (
			<div
				ref={visible ? null : ref}
				className='position-fixed'
				style={{
					display: 'flex',
					columnGap: '10%',
					width: '15%',
				}}
			>
				<div
					className='rounded-circle d-flex justify-content-center align-items-center'
					style={{ width: '60px', height: '60px', top: '100px' }}
					onClick={clickAction}
				>
					<img src={pointer} style={{ width: '80px', height: '80px' }} alt='' />
				</div>

				<ul className='list-group' style={{ visibility: visible ? 'visible' : 'hidden' }}>
					{levelsManager.getLevel(currentLevel).targets.map((t, i) => (
						<li
							key={i}
							className='list-group-item'
							onClick={() => {
								characterClickAction(t);
							}}
						>
							{t.name}
						</li>
					))}
				</ul>
			</div>
		);
	}
);

export default Pointer;
