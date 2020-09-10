const jwt = require('jsonwebtoken');
const keys = require('../config');
const throwError = require('../utils/throwError');

module.exports = async token => {
	if (!token) throwError(401, 'no auth token');

	try {
		await jwt.verify(token, keys.jwtSecret);
	} catch (e) {
		const error = e.toString().split(' ')[2];
		if (error === 'signature') throwError(401, 'bad token signature');
	}

	const decodedUser = jwt.decode(token);

	if (!decodedUser) throwError(401, 'Unauthorized');
	return decodedUser;
};
