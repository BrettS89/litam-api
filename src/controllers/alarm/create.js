import Alarm from '../../models/Alarm.js';
import User from '../../models/User.js';
import Handlers from '../../utils/handlers.js';
import throwError from '../../utils/throwError.js';
import userAuth from '../../utils/userAuth.js';

export default (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { time, day, repeats } = req.body;
    const userQuery = User.findById(_id);
    const alarm = new Alarm({
      user: _id,
      time,
      day,
      repeats,
    });
    const [user, savedAlarm] = await Promise.all(userQuery, alarm.save());
    if (!user) throwError(404, 'Invalid user');
    Handlers.success(res, 201, { alarm: savedAlarm });
  } catch(e) {
    Handlers.error(res, e, 'createAlarm');
  }
};
