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

interface Timer {
	hours: number;
	minutes: number;
	seconds: number;
	startTimer: () => void;
	stopTimer: () => void;
	resetTimer: () => void;
}

interface GameLevelsManager {
	getLevel: (levelId: number) => Level;
	getAllLevels: () => Level[];
	removeCharacterFromLevel: (levelId: number, charName: string) => void;
}

interface GameSettings {
	levelsManager?: GameLevelsManager;
	timer?: Timer;
}

export type { Point, Circle, Target, Level, Timer, GameLevelsManager, GameSettings };
