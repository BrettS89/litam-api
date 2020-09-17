const Alarm = require('../../models/Alarm');
const AlarmMessage = require('../../models/AlarmMessage');
const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const user = await User.findById(_id);
    const { alarmId, message, song } = req.body;
    const alarm = await Alarm.findById(alarmId);
    if (!alarm) throwError(404, 'Alarm not found');
    const alarmMessage = new AlarmMessage({
      alarm: alarmId,
      user: _id,
      song,
      message,
      forUser: alarm.user,
    });
    const savedMessage = await alarmMessage.save();
    alarm.alarmMessage = savedMessage._id;
    alarm.userWhoSetMessage = user.userName;
    await alarm.save();
    Handlers.success(res, 201, { updateAlarm: { alarm: alarm._id, userName: user.userName } });
  } catch(e) {
    Handlers.error(res, e, 'createAlarmMessage');
  }
};
