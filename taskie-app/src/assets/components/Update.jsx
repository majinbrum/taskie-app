const Update = ({ id, title, completed, setShowEditBox, onChange }) => {
	const saveUpdate = () => {
		let titleInput = document.querySelector("input#title");
		// title = titleInput.value ? titleInput.value : titleInput.defaultValue;
		// title = title + " ";

		if (titleInput.value == titleInput.defaultValue) {
			title = titleInput.value + " ";
		} else {
			title = titleInput.value;
		}

		fetch("/api/tasks/" + id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, completed }),
		})
			.then((response) => response.json())
			.then(() => onChange?.());
		setShowEditBox(true);
	};

	return (
		<>
			<div className="info-row">
				<input
					id="title"
					name="title"
					type="text"
					defaultValue={title}
					className="edit-task-title"
				/>

				<button
					className="edit-task-btn"
					onClick={saveUpdate}>
					<i className="fa-solid fa-floppy-disk fa-md"></i>
				</button>
			</div>
		</>
	);
};

export default Update;
