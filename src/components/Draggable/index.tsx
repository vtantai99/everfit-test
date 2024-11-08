import { useDraggable } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";
import "./style.css";
import type { DraggableType } from "../../types/draggable";

type Props<T> = PropsWithChildren & {
	containerId: string;
	data: T;
	type: DraggableType;
};

const Draggable = <T extends { id: string }>({ children, containerId, data, type }: Props<T>) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: data.id,
		data: {
			containerId,
			data,
			type,
		},
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined;

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="draggable"
			{...listeners}
			{...attributes}
		>
			{children}
		</div>
	);
};

export default Draggable;
