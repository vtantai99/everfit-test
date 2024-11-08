import { DotsIcon, PlusIcon } from "../../assets";
import type { Exercise } from "../../types/exercise";
import Draggable from "../Draggable";
import Droppable from "../Droppable";
import SubExerciseItem from "../SubExerciseItem";
import "./style.css";

type Props = {
	exercise: Exercise;
	weekDayId: string;
};

const ExerciseItem = (props: Props) => {
	const {
		exercise: { id, name, subExercises },
		weekDayId,
	} = props;

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
					<button type="button">
						<PlusIcon />
					</button>
				</div>
			</div>
		</Draggable>
	);
};

export default ExerciseItem;
