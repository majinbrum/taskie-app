import { useState } from "react";
import Task from "./Task";

const Tasks = ({ tasks }) => {
	const [showEdit, setShowEdit] = useState(false);

	return (
		<>
			<section className="list-title">
				<div>
					<h2>Your tasks</h2>
				</div>
				<button
					className="edit-list-btn"
					onClick={() => setShowEdit(!showEdit)}>
					{showEdit ? <i className="fa-solid fa-xmark fa-2xl"></i> : <i className="fa-solid fa-pen-to-square fa-xl"></i>}
				</button>
			</section>

			<ul className="tasks-list">
				{tasks.map((task) => (
					<Task
						key={task.id}
						id={task.id}
						title={task.title}
						completed={task.completed}
						showEdit={showEdit}
					/>
				))}
			</ul>
		</>
	);
};

export default Tasks;
