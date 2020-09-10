const success = (res, status, data) => {
	if (token) return res.status(status).json({ data });
	if (!token) return res.status(status).json({ data });
};

const error = (res, e, endpoint) => {
	if (!e.status) {
		console.log(`${endpoint} error: `, e);
		return res.status(500).json({ message: e.message });
	}
	console.log(`${endpoint} error: `, e.error);
	res.status(e.status).json({ message: e.error.message });
};

export default { success, error };