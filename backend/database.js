const Pool = require("pg").Pool;
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "taskieAPP",
	password: "postgres",
	port: 5432,
});

const getTasks = async (completed) => {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("SELECT * FROM tasks WHERE completed = $1 ORDER BY id DESC", [completed], (error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else {
					reject(new Error("nessun risultato"));
				}
			});
		});
	} catch (err) {
		console.error(err);
		throw new Error("Internal server error");
	}
};

// const getTask = async (id) => {
// 	try {
// 		return await new Promise(function (resolve, reject) {
// 			pool.query("SELECT * FROM tasks WHERE id = $1", [id], (error, results) => {
// 				if (error) {
// 					reject(error);
// 				}
// 				if (results && results.rows) {
// 					resolve(results.rows);
// 				} else {
// 					reject(new Error("nessun risultato"));
// 				}
// 			});
// 		});
// 	} catch (err) {
// 		console.error(err);
// 		throw new Error("Internal server error");
// 	}
// };

const createTask = (body) => {
	return new Promise(function (resolve, reject) {
		const { title, completed } = body;
		pool.query("INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *", [title, completed], (error, results) => {
			if (error) {
				reject(error);
			}
			if (results && results.rows) {
				resolve("A new task has been added: " + JSON.stringify(results.rows[0]));
			} else {
				reject(new Error("Nessun risultato"));
			}
		});
	});
};

const deleteTask = (id) => {
	return new Promise(function (resolve, reject) {
		pool.query("DELETE FROM tasks WHERE id = $1", [id], (error, results) => {
			if (error) {
				reject(error);
			}
			resolve("The task with id " + id + " has been deleted");
		});
	});
};

const updateTask = (id, body) => {
	return new Promise(function (resolve, reject) {
		const { title, completed } = body;
		pool.query("UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *", [title, completed, id], (error, results) => {
			if (error) {
				reject(error);
			}
			if (results && results.rows) {
				resolve("The task has been updated:" + JSON.stringify(results.rows[0]));
			} else {
				reject(new Error("Nessun risultato"));
			}
		});
	});
};

module.exports = {
	getTasks,
	// getTasksCompleted,
	// getTask,
	createTask,
	deleteTask,
	updateTask,
};
