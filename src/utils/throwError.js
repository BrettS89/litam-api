module.exports = (status, message) => {
	throw {
		status,
		error: new Error(message),
	};
};
