export function random(min: number, max: number): number {
	return min + Math.random() * max;
}

export function randomInt(min: number, max: number): number {
	return Math.floor(random(min, max));
}
