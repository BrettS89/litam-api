const Alarm = require('../../models/Alarm');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { id } = req.params;
    const alarm = await Alarm.findById(id);
    if (!alarm) throwError(404, 'No alarm was found with this id');
    alarm.active = !alarm.active;
    const updatedAlarm = await alarm.save();
    Handlers.success(res, 200, { alarm: updatedAlarm });
  } catch(e) {
    Handlers.error(res, e, 'toggleActive');
  }
};
