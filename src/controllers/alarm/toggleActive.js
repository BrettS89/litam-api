const Alarm = require('../../models/Alarm');
const Speaker = require('../../models/Speaker');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { id } = req.params;
    const [alarm, speaker] = await Promise.all([Alarm.findById(id), Speaker.findOne({ user: _id })]);
    if (!alarm) throwError(404, 'No alarm was found with this id');
    alarm.active = !alarm.active;
    const updatedAlarm = await alarm.save();
    if (speaker) {
      global.io.to(speaker.socketId).emit('ALARM_TOGGLED', { alarm: updatedAlarm });
    }
    Handlers.success(res, 200, { alarm: updatedAlarm });
  } catch(e) {
    Handlers.error(res, e, 'toggleActive');
  }
};
