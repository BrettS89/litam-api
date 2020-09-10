const AlarmMessage = require('../../models/AlarmMessage');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { alarmId, message, song } = req.body;
    const alarmMessage = new AlarmMessage({
      alarm: alarmId,
      user: _id,
      song,
      message,
    });
    const savedMessage = await alarmMessage.save();
    Handlers.success(res, 201, { alarmMessage: savedMessage });
  } catch(e) {
    Handlers.error(res, e, 'createAlarmMessage');
  }
};
