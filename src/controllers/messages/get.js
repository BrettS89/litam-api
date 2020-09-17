const AlarmMessage = require('../../models/AlarmMessage');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
  try {
    const { _id } = await userAuth(req.header('authorization'));
    const messages = await AlarmMessage.find({ forUser: _id, message: { $ne: null }, wasReceived: true })
      .populate('user', ['userName', 'photo'])
      .sort({ _id: -1 })
      .limit(20);

    Handlers.success(res, 200, { messages });
  } catch(e) {
    Handlers.error(res, e, 'getMessages');
  }
};
