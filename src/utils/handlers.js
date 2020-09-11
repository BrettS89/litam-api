exports.success = (res, status, data) => {
	return res.status(status).json({ data });
};

exports.error = (res, e, endpoint) => {
	if (!e.status) {
		console.log(`${endpoint} error: `, e);
		return res.status(500).json({ message: e.message });
	}
	console.log(`${endpoint} error: `, e.error);
	res.status(e.status).json({ message: e.error.message });
};
