import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";
import exercisesJson from "../data/exercises.json";
import subExercisesJson from "../data/subExercises.json";
import type { Exercise } from "../types/exercise";
import { getWeekDays } from "../utils/getWeekDays";
import { randomId } from "../utils/randomId";
import { pickRandomItem } from "../utils/getRandomElement";

interface ExercisesContextType {
	exercises: Exercise[];
	setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const getRandomWeekDayId = (availableDays: { id: string; day: Date }[]) => {
	const randomIndex = Math.floor(Math.random() * availableDays.length);

	const selectedDay = [...availableDays].splice(randomIndex, 1)[0];

	return selectedDay.id;
};

const ExercisesContext = createContext<ExercisesContextType | undefined>(
	undefined,
);

export const ExercisesProvider = ({ children }: { children: ReactNode }) => {
	const weekDays = getWeekDays();

	const [exercises, setExercises] = useState<Exercise[]>(
		[...exercisesJson].slice(0, 4).map((item) => ({
			id: randomId(),
			name: item,
			subExercises: Array.from(Array(3), () => ({
				...pickRandomItem(subExercisesJson),
				id: randomId(),
			})),
			weekDayId: getRandomWeekDayId(weekDays),
		})),
	);

	return (
		<ExercisesContext.Provider value={{ exercises, setExercises }}>
			{children}
		</ExercisesContext.Provider>
	);
};

export const useExercisesContext = (): ExercisesContextType => {
	const context = useContext(ExercisesContext);
	if (!context) {
		throw new Error(
			"useExercisesContext must be used within an ExercisesProvider",
		);
	}
	return context;
};
