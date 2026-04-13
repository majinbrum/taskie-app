import Check from "./Check";

const Task = ({ id, title, completed, showEdit, onChange }) => {
	const deleteTask = () => {
		fetch("/api/tasks/" + id, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then(() => onChange?.());
	};

	return (
		<>
			<li className="task">
				<del>
					<h3
						className="task-title"
						id={"title" + id}>
						{title}
					</h3>
				</del>

				{showEdit ? (
					<div className="edit-box">
						<button
							id={"del" + id}
							onClick={deleteTask}>
							<i className="fa-solid fa-trash-can fa-xl"></i>
						</button>
					</div>
				) : (
					<Check
						id={id}
						title={title}
						completedOld={completed}
						onChange={onChange}
					/>
				)}
			</li>
		</>
	);
};

export default Task;
