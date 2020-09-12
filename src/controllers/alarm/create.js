const Alarm = require('../../models/Alarm');
const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { time, day, days, amPm } = req.body;
    const userQuery = User.findById(_id);
    const alarm = new Alarm({
      user: _id,
      time,
      day,
      days,
      amPm,
    });
    const [user, savedAlarm] = await Promise.all([userQuery, alarm.save()]);
    if (!user) throwError(404, 'Invalid user');
    Handlers.success(res, 201, { alarm: savedAlarm });
  } catch(e) {
    Handlers.error(res, e, 'createAlarm');
  }
};
