export const isTheSameDate = (dateA: Date, dateB: Date) => {
	return (
		dateA.getDate() === dateB.getDate() &&
		dateA.getMonth() === dateB.getMonth() &&
		dateA.getFullYear() === dateB.getFullYear()
	);
};
