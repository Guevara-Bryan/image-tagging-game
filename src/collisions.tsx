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

const getDistance2D = (p1: Point, p2: Point): number => {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const isCircleCollision = (circle1: Circle, circle2: Circle): boolean => {
	return getDistance2D(circle1.center, circle2.center) <= circle1.radius + circle2.radius;
};

export { getDistance2D, isCircleCollision };
export type { Point, Circle, Target };
