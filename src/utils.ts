import React from 'react';
import beachMap from './images/beach-map.jpeg';
import snowMap from './images/snow-map.jpeg';

import { Level, Timer, GameLevelsManager, GameSettings } from './types';

const GameSettingsContext = React.createContext<GameSettings>({});

const POINTER_RADIUS = 30; // pixels

const useLevels = (): GameLevelsManager => {
	// TODO: Add firebase functionality to get the levels
	const [levels, setLevels] = React.useState<Level[]>([
		{
			id: 1,
			name: 'Snow Map',
			imageSrc: snowMap,
			targets: [
				{
					name: 'Odd Waldo',
					coordinates: { x: 953, y: 1299 },
				},
				{
					name: 'Waldo',
					coordinates: { x: 2560, y: 1484 },
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
		{
			id: 3,
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
		{
			id: 4,
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
	]);

	const getLevel = (levelId: number): Level => {
		const x = levels.find((lvl) => lvl.id === levelId);
		if (x === undefined) {
			throw Error(`Level with id: ${levelId} does not exist`);
		}
		return x;
	};

	const getAllLevels = (): Level[] => {
		return levels;
	};

	const removeCharacterFromLevel = (levelId: number, charName: string): void => {
		setLevels((prev) => {
			return prev.map((lvl) => {
				if (lvl.id === levelId) {
					return {
						id: lvl.id,
						name: lvl.name,
						imageSrc: lvl.imageSrc,
						targets: lvl.targets.filter((target) => target.name !== charName),
					};
				}
				return lvl;
			});
		});
	};

	return {
		getLevel,
		getAllLevels,
		removeCharacterFromLevel,
	};
};

const useTimer = (): Timer => {
	const [seconds, setSeconds] = React.useState<number>(0);
	let timerId: NodeJS.Timer | null = null;

	const startTimer = () => {
		if (timerId !== null) {
			return;
		}

		timerId = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, 1000);
	};

	const stopTimer = () => {
		if (timerId === null) {
			return;
		}
		clearInterval(timerId);
		timerId = null;
	};

	const resetTimer = () => {
		stopTimer();
		setSeconds(0);
	};

	return {
		seconds: seconds % 60,
		minutes: Math.floor(seconds / 60) % 60,
		hours: Math.floor((Math.floor(seconds / 60) - (Math.floor(seconds / 60) % 60)) / 60),
		startTimer,
		stopTimer,
		resetTimer,
	};
};

export { GameSettingsContext, POINTER_RADIUS, useLevels, useTimer };
