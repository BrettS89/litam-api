import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import keys from '../../config/index.js';
import User from '../../models/User.js';
import Handlers from '../../utils/handlers.js';
import throwError from '../../utils/throwError.js';

export default async (req, res) => {
	try {
    const { email, password, firstName, lastName, userName } = req.body;
		const foundUser = await User.findOne({ email });
		if (foundUser) throwError(400, 'This email already exists');
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
		const token = jwt.sign({ _id: savedUser._id }, keys.jwtSecret);
		Handlers.success(res, 201, { token, user: savedUser });
	} catch (e) {
		Handlers.error(res, e, 'register');
	}
};
