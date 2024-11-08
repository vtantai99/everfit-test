import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import "./App.css";
import { PlusIcon } from "./assets";
import Droppable from "./components/Droppable";
import ExerciseItem from "./components/ExerciseItem";
import { useExercisesContext } from "./context/ExercisesProvider";
import { useWeekDays } from "./hooks/useWeekDays";
import type { DraggableType } from "./types/draggable";
import type { SubExercise } from "./types/exercise";
import { formattedDate } from "./utils/formattedDate";
import { randomId } from "./utils/randomId";
import { pickRandomItem } from "./utils/getRandomElement";
import exercisesJson from "./data/exercises.json";

function App() {
	const { exercises, setExercises } = useExercisesContext();
	const { weekDays } = useWeekDays();

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over) return;

		const activeData: unknown = active.data.current?.data;
		const activeContainerId = active.data.current?.containerId as string;
		const activeType = active.data.current?.type as DraggableType;
		const overAcceptTypes = over.data.current?.accepts || [];

		if (activeType === "exercise" && overAcceptTypes.includes(activeType)) {
			const exerciseIndex = exercises.findIndex(
				(exercise) => exercise.id === active.id,
			);
			if (exerciseIndex !== -1) {
				setExercises((prevExercises) => {
					const newExercise = [...prevExercises];
					newExercise[exerciseIndex].weekDayId = over.id as string;

					return [...newExercise].sort((a, b) => {
						if (a.weekDayId > b.weekDayId) return -1;
						if (a.weekDayId < b.weekDayId) return 1;
						return 0;
					});
				});
			}
		}

		if (activeType === "subExercise" && overAcceptTypes.includes(activeType)) {
			const activeExerciseIndex = exercises.findIndex(
				(exercise) => exercise.id === activeContainerId,
			);
			const targetExerciseIndex = exercises.findIndex(
				(exercise) => exercise.id === over.id,
			);

			if (![activeExerciseIndex, targetExerciseIndex].includes(-1)) {
				setExercises((prevExercises) => {
					const newExercises = [...prevExercises];

					newExercises[activeExerciseIndex].subExercises = newExercises[
						activeExerciseIndex
					].subExercises.filter(
						(subExercise) => subExercise.id !== (activeData as SubExercise).id,
					);

					newExercises[targetExerciseIndex].subExercises.push(
						activeData as SubExercise,
					);

					return newExercises;
				});
			}
		}
	};

	const handleAddExercise = (weekDayId: string) => {
		setExercises((prevExercises) => {
			const newExercises = [...prevExercises];

			newExercises.push({
				id: randomId(),
				name: pickRandomItem(exercisesJson),
				subExercises: [],
				weekDayId,
			});

			return newExercises;
		});
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	return (
		<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
			<div className="container">
				<div className="weekdays-container">
					{weekDays.map((weekDay) => {
						const currentDayClass =
							formattedDate(new Date()) === weekDay.id ? "current-day" : "";

						return (
							<div
								key={weekDay.id}
								className={`day-container ${currentDayClass}`}
							>
								<Droppable id={weekDay.id} types={["exercise"]}>
									<h4 className="day-title">
										{weekDay.day
											.toLocaleDateString("en-US", { weekday: "short" })
											.toUpperCase()}
									</h4>
									<div className="day-content">
										<div className="day-content-header">
											<span className="day-number">
												{String(weekDay.day.getDate()).padStart(2, "0")}
											</span>
											<button
												type="button"
												onClick={() => handleAddExercise(weekDay.id)}
											>
												<PlusIcon />
											</button>
										</div>
										<div className="exercises-container">
											{exercises
												.filter((exercise) => exercise.weekDayId === weekDay.id)
												.map((exercise) => (
													<ExerciseItem
														key={exercise.id}
														exercise={exercise}
														weekDayId={weekDay.id}
													/>
												))}
										</div>
									</div>
								</Droppable>
							</div>
						);
					})}
				</div>
			</div>
		</DndContext>
	);
}

export default App;
