const express = require("express");
const app = express();
const port = 3001;

const db = require("./database");

app.use(express.json());
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
	next();
});

app.get("/incomplete", (req, res) => {
	db.getTasks(false)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.get("/completed", (req, res) => {
	db.getTasks(true)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

// app.get("/task/:id", (req, res) => {
// 	db.getTask(req.params.id)
// 		.then((response) => {
// 			res.status(200).send(response);
// 		})
// 		.catch((error) => {
// 			res.status(500).send(error);
// 		});
// });

app.post("/new-task", (req, res) => {
	db.createTask(req.body)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.delete("/tasks/:id", (req, res) => {
	db.deleteTask(req.params.id)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.put("/tasks/:id", (req, res) => {
	const id = req.params.id;
	const body = req.body;
	db.updateTask(id, body)
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(500).send(error);
		});
});

app.listen(port, () => {
	console.log("App running on port " + port);
});
