import User from '../../models/User.js';
import Handlers from '../../utils/handlers.js';
import throwError from '../../utils/throwError.js';
import userAuth from '../../utils/userAuth.js';

export default async (req, res) => {
	try {
		const user = await userAuth(req.header('authorization'));
		const foundUser = await User.findById(user._id);
		if (!foundUser) throwError(404, 'Could not find user');
		Handlers.success(res, 200, { user: foundUser }, null);
	} catch (e) {
		Handlers.error(res, e, 'isLoggedIn');
	}
};
