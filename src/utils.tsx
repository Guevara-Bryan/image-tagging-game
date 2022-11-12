import React from 'react';

import beachMap from './images/beach-map.jpeg';
import snowMap from './images/snow-map.jpeg';

interface Point {
	x: number;
	y: number;
}

interface Circle {
	center: Point;
	radius: number;
}

interface Target {
	name: string;
	coordinates: Point;
}

interface Level {
	id: number;
	name: string;
	imageSrc: string;
	targets: Target[];
}

interface GameLevelsManager {
	getLevel: (levelId: number) => Level;
	getAllLevels: () => Level[];
	removeCharacterFromLevel: (levelId: number, charName: string) => void;
}

const getDistance2D = (p1: Point, p2: Point): number => {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const isCircleCollision = (circle1: Circle, circle2: Circle): boolean => {
	return getDistance2D(circle1.center, circle2.center) < circle1.radius + circle2.radius;
};

const GameSettingsContext = React.createContext<GameLevelsManager>({} as GameLevelsManager);

const POINTER_RADIUS = 30; // pixels

const useLevels = (): GameLevelsManager => {
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

export { getDistance2D, isCircleCollision, GameSettingsContext, POINTER_RADIUS, useLevels };
export type { Point, Circle, Target, Level, GameLevelsManager };
