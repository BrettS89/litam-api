const AlarmMessage = require('../../models/AlarmMessage');
const Alarm = require('../../models/Alarm');
const Handlers = require('../../utils/handlers');
const throwError = require('../../utils/throwError');
const userAuth = require('../../utils/userAuth');
const defaultMessage = require('../../utils/defaultAlarmMessage');
const spotify = require('../../utils/spotify');
const song = {
  albumArt: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Chris_Brown_-_Indigo.png',
  audio: 'https://airsity-prod.s3.amazonaws.com/songs/24+Hours+(feat.+Bobby+Shmurda%2C+Teefli+%26+Ty+Dolla+Sign)',
  artist: 'Ty$ Dolla',
  song: '24 Hours',
  id: 'tbd',
};

module.exports = async (req, res) => {
  try {
    let removeAlarm = false;
    await userAuth(req.header('authorization'));
    const { alarmId } = req.params;

    const [alarm, alarmMessage] = await Promise.all([
      Alarm.findById(alarmId),
      AlarmMessage.findOne({ alarm: alarmId }).populate('user'),
    ]);

    // if (!alarm) throwError(404, 'Alarm not found');

    // Update alarm
    // const day = (day, days) => {
    //   if (days.length === 1) return day;
    //   const index = days.indexOf(day);
    //   if (days.length - 1 === index) return days[0];
    //   return days[index + 1];
    // }

    // if (alarm) {
    //   if (alarm.days && alarm.days.length) {
    //     alarm.day = day(alarm.day, alarm.days);
    //     alarm.updatedDate = new Date();
    //     alarm.alarmMessage = null;
    //     alarm.userWhoSetMessage = null;
    //     alarm.save();
    //   } else {
    //     removeAlarm = true;
    //     alarm.remove();
    //   }
    // }
    
    let songToSend;

    if (alarmMessage) {
      songToSend = await spotify.getTrack(alarmMessage.song);
      alarmMessage.wasReceived = true;
      alarmMessage.save();
    } else {
      songToSend = song
    }

    const message = {
      ...(alarmMessage ? alarmMessage.toObject() : defaultMessage),
      song: songToSend,
    };

    Handlers.success(res, 200, { alarmMessage: message, removeAlarm, alarmId: alarmId });
  } catch(e) {
    Handlers.error(res, e, 'getAlarmMessage');
  }
};
