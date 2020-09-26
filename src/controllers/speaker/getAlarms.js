const Speaker = require('../../models/Speaker');
const User = require('../../models/User');
const Alarm = require('../../models/Alarm');
const throwError = require('../../utils/throwError');
const Handlers = require('../../utils/handlers');

// module.exports = async (req, res) => {
//   try {
//     let user_id;
//     const { userId } = req.params;
//     const speakerId = req.header('authorization');
//     if (!speakerId) throwError(401, 'Unauthorized request');
//     const speaker = await Speaker.findOne({ givenId: speakerId });
//     if (!speaker) throwError(404, 'No speaker found with this givenId');
//     if (!speaker.user && !userId) throwError(400, 'Invalid request');
//     if (!speaker.user && speakerId) {
//       speaker.user = userId;
//       speaker.save();
//     }
//     user_id = userId || speaker.user;
//     const user = await User.findById(user_id);
//     if (!user) throwError(404, 'No user was found');
//     const myAlarms = await Alarm.find({ user: user_id });
//     Handlers.success(res, 200, { myAlarms });
//   } catch(e) {
//     Handlers.error(res, e, 'speakerGetAlarms');
//   }
// };

module.exports = async (speakerId, userId) => {
  try {
    let user_id;
    if (!userId) throwError(401, 'Unauthorized request');
    if (!speakerId) throwError(401, 'Unauthorized request');
    const speaker = await Speaker.findOne({ givenId: speakerId });
    if (!speaker) throwError(404, 'No speaker found with this givenId');
    if (!speaker.user && !userId) throwError(400, 'Invalid request');
    if (!speaker.user && speakerId) {
      speaker.user = userId;
      speaker.save();
    }
    user_id = userId || speaker.user;
    const user = await User.findById(user_id);
    if (!user) throwError(404, 'No user was found');
    const myAlarms = await Alarm.find({ user: user_id, deleted: false });
    return myAlarms;
  } catch(e) {
    return [];
  }
};
