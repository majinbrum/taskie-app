import { query } from "./_db.js";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.setHeader("Allow", "GET");
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	try {
		const { rows } = await query("SELECT * FROM tasks WHERE completed = $1 ORDER BY id DESC", [true]);
		return res.status(200).json(rows);
	} catch (err) {
		console.error("GET /api/completed failed:", err);
		return res.status(500).json({
			error: "Internal Server Error",
			detail: process.env.NODE_ENV === "production" ? undefined : String(err?.message || err),
		});
	}
}

