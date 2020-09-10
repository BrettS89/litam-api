export default (status, message) => {
	throw {
		status,
		error: new Error(message),
	};
};
