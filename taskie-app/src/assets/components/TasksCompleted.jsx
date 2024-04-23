import { useState } from "react";
import TaskCompleted from "./TaskCompleted";

const TasksCompleted = ({ tasksCompleted }) => {
	const [showEdit, setShowEdit] = useState(false);

	return (
		<>
			<section className="list-title">
				<div>
					<h2>Completed tasks</h2>
				</div>
				<button
					className="edit-list-btn"
					onClick={() => setShowEdit(!showEdit)}>
					{showEdit ? <i className="fa-solid fa-xmark fa-2xl"></i> : <i className="fa-solid fa-pen-to-square fa-xl"></i>}
				</button>
			</section>

			<ul className="tasks-list">
				{tasksCompleted.map((taskCompleted) => (
					<TaskCompleted
						key={taskCompleted.id}
						id={taskCompleted.id}
						title={taskCompleted.title}
						completed={taskCompleted.completed}
						showEdit={showEdit}
					/>
				))}
			</ul>
		</>
	);
};

export default TasksCompleted;
