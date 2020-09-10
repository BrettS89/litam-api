import Alarm from '../../models/Alarm.js';
import Handlers from '../../utils/handlers.js';
import userAuth from '../../utils/userAuth.js';

export default async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const alarms = await Alarm.find({ alarmMessage: null }).sort({ updatedDate: -1 }).limit(50);
    Handlers.success(res, 200, { alarms });
  } catch(e) {
    Handlers.error(res, e, 'getAlarms');
  }
};
