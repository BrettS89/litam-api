const Speaker = require('../../models/Speaker');
const User = require('../../models/User');
const AlarmMessage = require('../../models/AlarmMessage');
const userAuth = require('../../utils/userAuth');
const Handlers = require('../../utils/handlers');

module.exports = async (req, res) => {
  try {
    const _id = await req.header('authorization');
    const [user, speaker] = await Promise.all ([User.findById(_id), Speaker.findOne({ user: _id })]);
    
    user.isPlaying = null;
    user.save();

    Handlers.success(res, 200, { success: true });
  } catch(e) {
    Handlers.error(res, e, 'speakerGetAlarms');
  }
};
