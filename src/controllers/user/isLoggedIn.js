const User = require('../../models/User');
const AlarmMessage = require('../../models/AlarmMessage');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const throwError = require('../../utils/throwError');

module.exports = async (req, res) => {
	try {
		const user = await userAuth(req.header('authorization'));
		const foundUser = await User.findById(user._id);
		if (!foundUser) throwError(404, 'Could not find user');
		Handlers.success(res, 200, { user: foundUser });
	} catch (e) {
		Handlers.error(res, e, 'isLoggedIn');
	}
};
