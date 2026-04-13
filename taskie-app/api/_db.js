import pg from "pg";

const { Pool } = pg;

let pool;

export function getPool() {
	// Reuse between invocations in serverless environment
	if (!pool) {
		const connectionString = process.env.DATABASE_URL;
		if (!connectionString) {
			throw new Error("Missing DATABASE_URL environment variable");
		}

		pool = new Pool({
			connectionString,
			ssl:
				process.env.PGSSLMODE === "disable"
					? false
					: {
							// Common for managed Postgres providers; prefer provider-specific CA in stricter setups
							rejectUnauthorized: false,
						},
		});
	}

	return pool;
}

export async function query(text, params) {
	const p = getPool();
	return p.query(text, params);
}

