const Create = ({ setShowCreate }) => {
	const createTask = () => {
		let titleInput = document.querySelector("input#title");
		let title = titleInput.value;

		let completed = false;
		console.log("title: " + title + ", completed: " + completed);
		fetch("http://localhost:3001/new-task", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, completed }),
		})
			.then((response) => response.text())
			.then((data) => {
				console.log(data);
			});
		emptyInput();
		setShowCreate(false);
	};

	const emptyInput = () => {
		let titleInput = document.querySelector("input#title");
		titleInput.value = "";
	};

	return (
		<>
			<section className="new-task-menu">
				<header>
					<h2>New task</h2>
					<button onClick={() => setShowCreate(false)}>
						<i className="fa-regular fa-circle-xmark fa-xl"></i>
					</button>
				</header>
				{/* <label htmlFor="title">Title</label> */}
				<section>
					<div className="info-row">
						<input
							id="title"
							name="title"
							type="text"
							className="new-task-title"
							placeholder="Task title..."
						/>
						<button
							className="add-task-btn"
							onClick={createTask}>
							{" "}
							<i className="fa-solid fa-circle-arrow-up"></i>
						</button>
					</div>
				</section>
			</section>
		</>
	);
};

export default Create;
