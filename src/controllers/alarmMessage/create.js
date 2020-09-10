import AlarmMessage from '../../models/AlarmMessage.js';
import Handlers from '../../utils/handlers.js';
import throwError from '../../utils/throwError.js';
import userAuth from '../../utils/userAuth.js';

export default async (req, res) => {
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
