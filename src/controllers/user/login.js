import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import keys from '../../config/index.js';
import User from '../../models/User.js';
import Handlers from '../../utils/handlers.js';
import throwError from '../../utils/throwError.js';

export default async ({ body: { email, password } }, res) => {
	try {
		const user = await User.findOne({ email }).lean();
    if (!user) throwError(404, 'No user found with this email');
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) throwError(401, 'Incorrect login credentials');
		const token = jwt.sign({ _id: user._id }, keys.jwtSecret);
		delete user.password;
		Handlers.success(res, 200, { user, token }, null);
	} catch (e) {
		Handlers.error(res, e, 'login');
	}
};
