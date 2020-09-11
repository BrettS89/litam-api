const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config');
const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');

module.exports = async ({ body: { email, password } }, res) => {
	try {
		const user = await User.findOne({ email }).lean();
    if (!user) throwError(404, 'No user found with this email');
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) throwError(401, 'Incorrect login credentials');
		const token = jwt.sign({ _id: user._id }, keys.jwtSecret);
		delete user.password;
		Handlers.success(res, 200, { user, token });
	} catch (e) {
		Handlers.error(res, e, 'login');
	}
};
