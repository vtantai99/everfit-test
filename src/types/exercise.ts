export type Exercise = {
	id: string;
	name: string;
	subExercises: SubExercise[];
	weekDayId: string;
};

export type SubExercise = {
	id: string;
	name: string;
	description: string;
	set: number;
};
