import { useDroppable } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";
import type { DraggableType } from "../../types/draggable";

interface HasId {
	id: string;
	types: DraggableType[];
}

const Droppable = <T extends HasId>({
	children,
	id,
	types,
}: PropsWithChildren<T>) => {
	const { isOver, setNodeRef } = useDroppable({
		id,
		data: {
			accepts: types,
		},
	});
	const style = {
		color: isOver ? "green" : undefined,
	};

	return (
		<div ref={setNodeRef} style={style}>
			{children}
		</div>
	);
};

export default Droppable;
