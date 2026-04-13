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

	const refreshAll = async () => {
		const [incompleteRes, completedRes] = await Promise.all([fetch("/api/incomplete"), fetch("/api/completed")]);
		const [incomplete, completed] = await Promise.all([incompleteRes.json(), completedRes.json()]);

		setTasks(incomplete);
		setTasksCount(incomplete.length);
		setTasksCompleted(completed);
		setTasksCompletedCount(completed.length);
	};

	useEffect(() => {
		refreshAll();
	}, []);

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
				{tasksCount ? <Tasks tasks={tasks} onChange={refreshAll} /> : null}
				{tasksCompletedCount ? <TasksCompleted tasksCompleted={tasksCompleted} onChange={refreshAll} /> : null}
			</main>
			{showCreate ? null : (
				<button
					className="new-task-btn"
					onClick={() => setShowCreate(!showCreate)}>
					{/* <i className="fa-solid fa-circle-plus"></i> */}
					<i className="fa-solid fa-plus"></i>
				</button>
			)}
			{showCreate ? <Create setShowCreate={setShowCreate} onCreate={refreshAll} /> : null}
		</>
	);
};

export default App;
