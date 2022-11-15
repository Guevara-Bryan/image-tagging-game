import React from 'react';
import { useNavigate } from 'react-router-dom';
import pointer from '../images/crosshair.png';

import { collection, addDoc } from 'firebase/firestore';

import { dataBase } from '../firebase';

import { GameSettings, Point, Circle, Target } from '../types';

import { GameSettingsContext, POINTER_RADIUS } from '../utils';

import { isCircleCollision } from '../collisions/collisions';

interface PointerProps {
	visible: boolean;
	setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
	currentLevel: number;
}

const Pointer = React.forwardRef<HTMLDivElement, PointerProps>(
	({ visible, setVisibility, currentLevel }, ref) => {
		const currentSettings: GameSettings = React.useContext(GameSettingsContext);
		const [pointerCenter, setPointerCenter] = React.useState<Point>({ x: 0, y: 0 });
		const navigate = useNavigate();

		const addPlayerEntry = async (name: string, level: number, time: number) => {
			try {
				const docRef = await addDoc(collection(dataBase, 'leaderboard'), { name, level, time });
				console.log(`Entry written with id: ${docRef.id}`);
			} catch (error) {
				console.log('Error adding player entry: ', error);
			}
		};

		const endLevel = () => {
			const name = prompt('Congrats, you found them all. Enter your name');
			if (name) {
				addPlayerEntry(name, currentLevel, currentSettings.timer.getTimeInSeconds());
				navigate('/leaderboard');
			} else {
				navigate('/');
			}
		};
		const clickAction = (e: React.MouseEvent): void => {
			setVisibility((prev) => !prev);
			setPointerCenter({ x: e.pageX, y: e.pageY });
		};

		const characterClickAction = async (character: Target): Promise<void> => {
			setVisibility(false);
			console.log(pointerCenter);
			const targetCirlce: Circle = {
				center: character.coordinates,
				radius: POINTER_RADIUS,
			};
			const pointerCircle: Circle = {
				center: pointerCenter,
				radius: POINTER_RADIUS,
			};
			if (isCircleCollision(targetCirlce, pointerCircle)) {
				alert(`Congrats, you found: ${character.name}`);
				if (currentSettings.levelsManager.getLevel(currentLevel)?.targets.length === 1) {
					endLevel();
				}
				currentSettings.levelsManager.removeCharacterFromLevel(currentLevel, character.name);
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
					{currentSettings.levelsManager.getLevel(currentLevel)?.targets.map((t, i) => (
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
