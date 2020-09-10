import Alarm from '../../models/Alarm.js';
import AlarmMessage from '../../models/AlarmMessage.js';
import Handlers from '../../utils/handlers.js';
import throwError from '../../utils/throwError.js';
import userAuth from '../../utils/userAuth.js';
import defaultMessage from '../../utils/defaultAlarmMessage.js';

const song = {
  albumArt: 'tbd',
  audio: 'https://airsity-prod.s3.amazonaws.com/songs/24+Hours+(feat.+Bobby+Shmurda%2C+Teefli+%26+Ty+Dolla+Sign)',
  artist: 'Ty$ Dolla',
  song: '24 Hours',
};

export default async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const { alarmId } = req.params;
    const [alarm, alarmMessage] = await Promise.all([
      Alarm.findById(alarmId),
      AlarmMessage.findOne({ alarm: alarmId }).populate('user'),
    ]);

    if (!alarm) throwError(404, 'Alarm not found');

    // Update alarm
    const day = (day, days) => {
      if (days.length === 1) return day;
      const index = days.indexOf(day);
      if (days.length - 1 === index) return days[0];
      return das[index + 1];
    }

    alarm.day = day(alarm.day, alarm.days);
    alarm.updatedDate = new Date();
    alarm.alarmMessage = null;
    alarm.save();

    const message = {
      ...(alarmMessage ? alarmMessage.toObject : defaultMessage),
      song,
    };

    Handlers.success(res, 200, { alarmMessage: message });
  } catch(e) {
    Handlers.error(res, e, 'getAlarmMessage');
  }
};
