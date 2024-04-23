import { useState } from "react";
import { createRoot } from "react-dom/client";

import Update from "./Update";
import Check from "./Check";

const Task = ({ id, title, completed, showEdit }) => {
	const [showEditBox, setShowEditBox] = useState(true);
	const deleteTask = () => {
		fetch("http://localhost:3001/tasks/" + id, {
			method: "DELETE",
		})
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
			});
	};

	const updateTaskComp = () => {
		const root = document.getElementById("title" + id);
		let rootInstance = createRoot(root);
		const component = (
			<Update
				id={id}
				title={title}
				completed={completed}
				setShowEditBox={setShowEditBox}
			/>
		);
		rootInstance.render(component);
	};

	return (
		<>
			<li className="task">
				<h3
					className="task-title"
					id={"title" + id}>
					{title}
				</h3>

				{showEditBox ? (
					<>
						{showEdit ? (
							<div className="edit-box">
								<button
									id={"del" + id}
									onClick={deleteTask}>
									<i className="fa-solid fa-trash-can fa-xl"></i>
								</button>
								<button
									id={"upd" + id}
									onClick={() => {
										updateTaskComp();
										setShowEditBox(false);
									}}>
									<i className="fa-solid fa-pen fa-xl"></i>
								</button>
							</div>
						) : (
							<Check
								id={id}
								title={title}
								completedOld={completed}
							/>
						)}
					</>
				) : null}
			</li>
		</>
	);
};

export default Task;
