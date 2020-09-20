const Alarm = require('../../models/Alarm');
const Speaker = require('../../models/Speaker');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { alarmId } = req.params;
    const [alarm, speaker] = await Promise.all([Alarm.findById(alarmId), Speaker.findOne({ user: _id })]);
    if (!alarm) throwError(404, 'No alarm found with this id');
    await alarm.remove();
    if (speaker) {
      global.io.to(speaker.socketId).emit('ALARM_DELETED', { _id: alarm._id });
    }
    Handlers.success(res, 200, { alarmId: alarm._id });
  } catch(e) {
    Handlers.error(res, e, 'deleteAlarm');
  }
};
