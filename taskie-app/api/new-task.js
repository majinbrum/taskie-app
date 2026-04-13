import { query } from "./_db.js";
import { safeErrorDetail } from "./_error.js";

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
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	const body = readJsonBody(req);
	if (!body || typeof body.title !== "string") {
		return res.status(400).json({ error: "Invalid body" });
	}

	const title = body.title.trim();
	const completed = Boolean(body.completed);

	if (!title) return res.status(400).json({ error: "Title is required" });

	try {
		const { rows } = await query("INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *", [
			title,
			completed,
		]);
		return res.status(200).json(rows[0]);
	} catch (err) {
		console.error("POST /api/new-task failed:", err);
		const detail = safeErrorDetail(err);
		return res.status(500).json({
			error: "Internal Server Error",
			detail,
		});
	}
}

