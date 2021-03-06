const Alarm = require('../../models/Alarm');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { alarmId } = req.params;
    const alarm = await Alarm.findById(alarmId);
    if (!alarm) throwError(404, 'No alarm found with this id');
    await alarm.remove();
    Handlers.success(res, 200, { alarmId: alarm._id });
  } catch(e) {
    Handlers.error(res, e, 'deleteAlarm');
  }
};
