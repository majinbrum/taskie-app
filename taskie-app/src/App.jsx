import { useState, useEffect } from "react";
import Tasks from "./assets/components/Tasks";
import TasksCompleted from "./assets/components/TasksCompleted";
import Create from "./assets/components/Create";
import Header from "./assets/components/Header";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [tasksCount, setTasksCount] = useState();
	const [tasksCompletedCount, setTasksCompletedCount] = useState();
	const [tasksCompleted, setTasksCompleted] = useState([]);
	const [showCreate, setShowCreate] = useState(false);

	const getTasks = () => {
		// Fetch incomplete tasks
		fetch("http://localhost:3001/incomplete")
			.then((response) => response.json())
			.then((data) => {
				// Handle incomplete tasks data
				setTasks(data);
				setTasksCount(data.length);
			});
	};

	useEffect(() => {
		getTasks();
	}, [tasks]);

	const getTasksCompleted = () => {
		// Fetch completed tasks
		fetch("http://localhost:3001/completed")
			.then((response) => response.json())
			.then((data) => {
				// Handle completed tasks data
				setTasksCompleted(data);
				setTasksCompletedCount(data.length);
			});
	};

	useEffect(() => {
		getTasksCompleted();
	}, [tasksCompleted]);

	// const getTasks = () => {
	// 	fetch("http://localhost:3001/")
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setTasks(data);
	// 		});
	// };

	// useEffect(() => {
	// 	getTasks();
	// }, [tasks]);

	return (
		<>
			<Header tasksCount={tasksCount} />
			<main className="app-main">
				{tasksCount ? <Tasks tasks={tasks} /> : null}
				{tasksCompletedCount ? <TasksCompleted tasksCompleted={tasksCompleted} /> : null}
			</main>
			{showCreate ? null : (
				<button
					className="new-task-btn"
					onClick={() => setShowCreate(!showCreate)}>
					{/* <i className="fa-solid fa-circle-plus"></i> */}
					<i class="fa-solid fa-plus"></i>
				</button>
			)}
			{showCreate ? <Create setShowCreate={setShowCreate} /> : null}
		</>
	);
};

export default App;
