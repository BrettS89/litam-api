const Alarm = require('../../models/Alarm');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const alarms = await Alarm.find({ user: _id });
    Handlers.success(res, 200, { alarms });
  } catch(e) {
    Handlers.error(res, e, 'getAlarms');
  }
};
