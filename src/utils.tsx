import React from 'react';

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

interface GameSettings {
	level: Level;
	setter: React.Dispatch<React.SetStateAction<Level>>;
}

const EMPTY_LEVEL: Level = {
	id: -1,
	name: 'EMPTY LEVEL',
	imageSrc: '#',
	targets: [],
};

const getDistance2D = (p1: Point, p2: Point): number => {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const isCircleCollision = (circle1: Circle, circle2: Circle): boolean => {
	return getDistance2D(circle1.center, circle2.center) <= circle1.radius + circle2.radius;
};

const GameSettingsContext = React.createContext<GameSettings>({} as GameSettings);

export { getDistance2D, isCircleCollision, GameSettingsContext, EMPTY_LEVEL };
export type { Point, Circle, Target, Level, GameSettings };
