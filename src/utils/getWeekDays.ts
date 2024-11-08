import { formattedDate } from "./formattedDate";

export const getWeekDays = (): { id: string; day: Date }[] => {
	const currentDate = new Date();
	const startOfWeek = new Date(currentDate);
	const days = [];

	const day = currentDate.getDay();
	const diffToMonday = day === 0 ? -6 : 1 - day;
	startOfWeek.setDate(currentDate.getDate() + diffToMonday);

	for (let i = 0; i < 7; i++) {
		const day = new Date(startOfWeek);
		day.setDate(startOfWeek.getDate() + i);
		days.push(day);
	}

	return days.map((day) => ({
		id: formattedDate(day),
		day,
	}));
};
