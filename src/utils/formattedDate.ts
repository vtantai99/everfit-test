export const formattedDate = (date: Date) => {
	return date.toISOString().slice(0, 10);
};
