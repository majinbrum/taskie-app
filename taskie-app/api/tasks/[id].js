import { query } from "../_db.js";
import { safeErrorDetail } from "../_error.js";

function readJsonBody(req) {
	if (req.body && typeof req.body === "object") return req.body;
	if (typeof req.body === "string") {
		try {
			return JSON.parse(req.body);
		} catch {
			return null;
		}
	}
	return null;
}

export default async function handler(req, res) {
	const { id } = req.query || {};
	const taskId = Number(id);

	if (!Number.isInteger(taskId)) {
		return res.status(400).json({ error: "Invalid id" });
	}

	if (req.method === "DELETE") {
		try {
			await query("DELETE FROM tasks WHERE id = $1", [taskId]);
			return res.status(200).json({ ok: true });
		} catch (err) {
			console.error("DELETE /api/tasks/[id] failed:", err);
			const detail = safeErrorDetail(err);
			return res.status(500).json({
				error: "Internal Server Error",
				detail,
			});
		}
	}

	if (req.method === "PUT") {
		const body = readJsonBody(req);
		if (!body || typeof body.title !== "string") {
			return res.status(400).json({ error: "Invalid body" });
		}

		const title = body.title.trim();
		const completed = Boolean(body.completed);

		if (!title) return res.status(400).json({ error: "Title is required" });

		try {
			const { rows } = await query("UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *", [
				title,
				completed,
				taskId,
			]);
			return res.status(200).json(rows[0] ?? null);
		} catch (err) {
			console.error("PUT /api/tasks/[id] failed:", err);
			const detail = safeErrorDetail(err);
			return res.status(500).json({
				error: "Internal Server Error",
				detail,
			});
		}
	}

	res.setHeader("Allow", "PUT, DELETE");
	return res.status(405).json({ error: "Method Not Allowed" });
}

