import React from 'react';

import { getDocs, collection } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { dataBase } from './firebase';

import { Level, Timer, GameLevelsManager, GameSettings, Time } from './types';

const GameSettingsContext = React.createContext<GameSettings>({} as GameSettings);

const POINTER_RADIUS = 30; // pixels

// {
// 	id: 2,
// 	name: 'Beach Map',
// 	imageSrc: beachMap,
// 	targets: [
// 		{
// 			name: 'Odd Waldo',
// 			coordinates: { x: 413, y: 830 },
// 		},
// 		{
// 			name: 'Wizard',
// 			coordinates: { x: 1037, y: 830 },
// 		},
// 		{
// 			name: 'Waldo',
// 			coordinates: { x: 2373, y: 882 },
// 		},
// 	],
// },

const useLevels = (): GameLevelsManager => {
	// TODO: Add firebase functionality to get the levels
	const [levels, setLevels] = React.useState<Level[]>([]);

	const fetchLevels = async (): Promise<void> => {
		const querySnapshot = await getDocs(collection(dataBase, 'levels'));

		setLevels(
			await Promise.all(
				querySnapshot.docs.map(async (doc) => {
					const imageSrc: string = await getDownloadURL(ref(getStorage(), doc.data().imageSrc));
					const thumbnail: string = await getDownloadURL(ref(getStorage(), doc.data().thumbnail));
					const level: Level = {
						id: parseInt(doc.id),
						name: doc.data().name,
						imageSrc,
						thumbnail,
						targets: doc.data().targets,
					};

					return level;
				})
			)
		);
	};

	React.useEffect(() => {
		fetchLevels();
	}, []);

	const getLevel = (levelId: number): Level | undefined => {
		return levels.find((lvl) => lvl.id === levelId);
	};

	const getAllLevels = (): Level[] => {
		return levels;
	};

	const removeCharacterFromLevel = (levelId: number, charName: string): void => {
		setLevels((prev) => {
			return prev.map((lvl) => {
				const newTargets = lvl.targets.filter((target) => target.name !== charName);
				if (lvl.id === levelId) {
					return {
						id: lvl.id,
						name: lvl.name,
						imageSrc: lvl.imageSrc,
						thumbnail: lvl.thumbnail,
						targets: newTargets,
					};
				}
				return lvl;
			});
		});
	};

	const resetLevels = () => {
		fetchLevels();
	};

	return {
		getLevel,
		resetLevels,
		getAllLevels,
		removeCharacterFromLevel,
	};
};

const secondsToTime = (seconds: number): Time => {
	return {
		seconds: seconds % 60,
		minutes: Math.floor(seconds / 60) % 60,
		hours: Math.floor((Math.floor(seconds / 60) - (Math.floor(seconds / 60) % 60)) / 60),
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

	const getTimeInSeconds = () => {
		return seconds;
	};

	return {
		...secondsToTime(seconds),
		startTimer,
		stopTimer,
		resetTimer,
		getTimeInSeconds,
	};
};

export { GameSettingsContext, POINTER_RADIUS, useLevels, useTimer, secondsToTime };
