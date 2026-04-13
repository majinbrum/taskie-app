export function safeErrorDetail(err) {
	const message = String(err?.message || err || "Unknown error");
	// Remove any accidental connection-string-like substrings
	const scrubbed = message.replace(/postgres(?:ql)?:\/\/\S+/gi, "[redacted]");
	return {
		message: scrubbed,
		code: err?.code ? String(err.code) : undefined,
	};
}

