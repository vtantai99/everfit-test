import { useState } from "react";
import exercisesJson from "../data/exercises.json";
import type { Exercise } from "../types/exercise";
import { getWeekDays } from "../utils/getWeekDays";
import { randomId } from "../utils/randomId";

// const initialState: Exercise[] = [
// 	{
// 		id: randomId(),
// 		name: "Shoulder Day - Isolation",
// 		subExercises: [
// 			{
// 				id: randomId(),
// 				name: "Overhead Press",
// 				description: "75Lb * 8",
// 				set: 3, // Adding number of sets
// 			},
// 			{
// 				id: randomId(),
// 				name: "Lateral Raises",
// 				description: "10Lb * 12",
// 				set: 4, // Adding number of sets
// 			},
// 		],
// 		weekDayId: formattedDate(
// 			new Date(new Date().setDate(new Date().getDate() - 2)),
// 		),
// 	},
// 	{
// 		id: randomId(),
// 		name: "Arm Day - Biceps and Triceps",
// 		subExercises: [
// 			{
// 				id: randomId(),
// 				name: "Bicep Curls",
// 				description: "30Lb * 10",
// 				set: 3,
// 			},
// 			{
// 				id: randomId(),
// 				name: "Tricep Dips",
// 				description: "Bodyweight * 10",
// 				set: 4,
// 			},
// 		],
// 		weekDayId: formattedDate(
// 			new Date(new Date().setDate(new Date().getDate() - 1)),
// 		),
// 	},
// 	{
// 		id: randomId(),
// 		name: "Chest Day - With Trainer Pro",
// 		subExercises: [
// 			{
// 				id: randomId(),
// 				name: "Bench Press Middle",
// 				description: "50Lb * 10",
// 				set: 5,
// 			},
// 		],
// 		weekDayId: formattedDate(new Date()),
// 	},
// 	{
// 		id: randomId(),
// 		name: "Leg Day - Strength Focus",
// 		subExercises: [
// 			{
// 				id: randomId(),
// 				name: "Squats",
// 				description: "100Lb * 8",
// 				set: 4,
// 			},
// 			{
// 				id: randomId(),
// 				name: "Leg Press",
// 				description: "150Lb * 10",
// 				set: 3,
// 			},
// 		],
// 		weekDayId: formattedDate(
// 			new Date(new Date().setDate(new Date().getDate() + 1)),
// 		),
// 	},
// 	{
// 		id: randomId(),
// 		name: "Back Day - Pull Exercises",
// 		subExercises: [
// 			{
// 				id: randomId(),
// 				name: "Pull Ups",
// 				description: "Bodyweight * 8",
// 				set: 3,
// 			},
// 			{
// 				id: randomId(),
// 				name: "Deadlift",
// 				description: "200Lb * 5",
// 				set: 4,
// 			},
// 		],
// 		weekDayId: formattedDate(
// 			new Date(new Date().setDate(new Date().getDate() + 2)),
// 		),
// 	},
// ];

const getRandomWeekDayId = (availableDays: { id: string; day: Date }[]) => {
	const randomIndex = Math.floor(Math.random() * availableDays.length);

	const selectedDay = availableDays.splice(randomIndex, 1)[0];

	return selectedDay.id;
};

export const useExercises = () => {
	const weekDays = getWeekDays();
	const [exercises, setExercises] = useState<Exercise[]>(
		exercisesJson.map((item) => ({
			...item,
			id: randomId(),
			subExercises: item.subExercises.map((subExercise) => ({
				...subExercise,
				id: randomId(),
			})),
			weekDayId: getRandomWeekDayId(weekDays),
		})),
	);

	return { exercises, setExercises };
};
