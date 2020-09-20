const Alarm = require('../../models/Alarm');
const User = require('../../models/User');
const Speaker = require('../../models/Speaker');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { time, day, days, amPm, displayTime } = req.body;
    const userQuery = User.findById(_id);
    const alarm = new Alarm({
      user: _id,
      time,
      day,
      days,
      amPm,
      displayTime
    });
    const [user, savedAlarm, speaker] = await Promise.all([userQuery, alarm.save(), Speaker.findOne({ user: _id })]);
    if (!user) throwError(404, 'Invalid user');
    if (speaker) {
      global.io.to(speaker.socketId).emit('ALARM_ADDED', { alarm: savedAlarm });
    }
    Handlers.success(res, 201, { alarm: savedAlarm });
  } catch(e) {
    Handlers.error(res, e, 'createAlarm');
  }
};
