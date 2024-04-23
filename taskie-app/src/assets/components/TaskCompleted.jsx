import Check from "./Check";

const Task = ({ id, title, completed, showEdit }) => {
	const deleteTask = () => {
		fetch("http://localhost:3001/tasks/" + id, {
			method: "DELETE",
		})
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
			});
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
					/>
				)}
			</li>
		</>
	);
};

export default Task;
