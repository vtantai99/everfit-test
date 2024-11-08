import { DotsIcon, PlusIcon } from "../../assets";
import { useExercisesContext } from "../../context/ExercisesProvider";
import type { Exercise } from "../../types/exercise";
import { pickRandomItem } from "../../utils/getRandomElement";
import Draggable from "../Draggable";
import Droppable from "../Droppable";
import SubExerciseItem from "../SubExerciseItem";
import "./style.css";
import subExercisesJson from "../../data/subExercises.json";
import { randomId } from "../../utils/randomId";

type Props = {
	exercise: Exercise;
	weekDayId: string;
};

const ExerciseItem = (props: Props) => {
	const {
		exercise: { id, name, subExercises },
		weekDayId,
	} = props;

	const { exercises, setExercises } = useExercisesContext();

	const handleAddSubExercise = (e: React.MouseEvent) => {
		e.stopPropagation();
		console.log("ping ping");
		const exerciseIndex = exercises.findIndex((exercise) => exercise.id === id);
		console.log("David Vo 🚀 ~> exerciseIndex:", exerciseIndex);

		if (exerciseIndex !== -1) {
			setExercises((prevExercise) => {
				const newExercise = [...prevExercise];

				newExercise[exerciseIndex].subExercises.push({
					...pickRandomItem(subExercisesJson),
					id: randomId(),
				});

				return newExercise;
			});
		}
	};

	return (
		<Draggable
			containerId={weekDayId}
			data={{ id, name, subExercises }}
			type="exercise"
		>
			<div className="exercise-container">
				<div className="exercise-header">
					<p className="exercise-name" title={name}>
						{name}
					</p>
					<DotsIcon />
				</div>
				<Droppable id={id} types={["subExercise"]}>
					<div className="exercise-content">
						{subExercises.map((subExercise) => (
							<SubExerciseItem
								key={subExercise.id}
								subExercise={subExercise}
								exerciseId={id}
							/>
						))}
					</div>
				</Droppable>
				<div className="exercise-footer">
					<button type="button" onClick={(e) => handleAddSubExercise(e)}>
						<PlusIcon />
					</button>
				</div>
			</div>
		</Draggable>
	);
};

export default ExerciseItem;
