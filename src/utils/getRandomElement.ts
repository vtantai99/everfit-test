export const pickRandomItem = <T>(array: T[]): T =>
	array[Math.floor(Math.random() * array.length)];
