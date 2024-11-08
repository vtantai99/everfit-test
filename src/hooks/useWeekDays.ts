import { useState } from "react";
import { getWeekDays } from "../utils/getWeekDays";

type WeekDay = {
	id: string;
	day: Date;
};

export const useWeekDays = () => {
	const [weekDays] = useState<WeekDay[]>(getWeekDays());

	return { weekDays };
};
