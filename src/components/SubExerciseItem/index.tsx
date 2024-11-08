import type { SubExercise } from "../../types/exercise";
import Draggable from "../Draggable";
import "./style.css";

type Props = {
	exerciseId: string;
	subExercise: SubExercise;
};

const SubExerciseItem = (props: Props) => {
	const {
		exerciseId,
		subExercise: { id, name, description, set },
	} = props;

	return (
		<Draggable
			containerId={exerciseId}
			data={{ id, name, description, set }}
			type="subExercise"
		>
			<div className="subExercise-container">
				<div className="subExercise-header">
					<p className="subExercise-name">{name}</p>
				</div>

				<div className="subExercise-description-container">
					<span className="subExercise-amount">{set}x</span>
					<p className="subExercise-description">{description}</p>
				</div>
			</div>
		</Draggable>
	);
};

export default SubExerciseItem;
