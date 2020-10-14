const Alarm = require('../../models/Alarm');
const AlarmMessage = require('../../models/AlarmMessage');
const Speaker = require('../../models/Speaker');
const User = require('../../models/User');
const throwError = require('../throwError');

/*
  General resource factory returns any resource by _id
*/

function getResourceById(resourceName, _id) {
  const resourceMap = {
    Alarm,
    AlarmMessage,
    Speaker,
    User,
  };

  const Resource = resourceMap[resourceName];

  if (!Resource) {
    throwError(404, `A resource with the name ${resourceName} does not exist`);
  }

  return Resource.findById(_id);
}

module.exports = {
  getResourceById,
};
