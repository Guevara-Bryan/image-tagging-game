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
	thumbnail: string;
	targets: Target[];
}

interface Timer {
	hours: number;
	minutes: number;
	seconds: number;
	startTimer: () => void;
	stopTimer: () => void;
	resetTimer: () => void;
	getTimeInSeconds: () => number;
}

interface GameLevelsManager {
	getLevel: (levelId: number) => Level | undefined;
	getAllLevels: () => Level[];
	resetLevels: () => void;
	removeCharacterFromLevel: (levelId: number, charName: string) => void;
}

interface GameSettings {
	levelsManager: GameLevelsManager;
	timer: Timer;
}

interface Time {
	hours: number;
	minutes: number;
	seconds: number;
}

interface playerEntry {
	id: string;
	name: string;
	level: number;
	time: number;
}

export type {
	Point,
	Circle,
	Target,
	Level,
	Timer,
	GameLevelsManager,
	GameSettings,
	Time,
	playerEntry,
};
