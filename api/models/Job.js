/**
 * Job.js
 *
 * @description :: Model for a Job
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const uuid = require('node-uuid');

module.exports = {
  schema: true,
  attributes: {
    uuid: {
      type: 'string',
      unique: true,
      uuidv4: true,
      defaultsTo: () => uuid.v4(),
    },
    botUuid: {
      type: 'string',
      unique: true,
      uuidv4: true,
      defaultsTo: () => uuid.v4(),
    },
    fileUuid: {
      type: 'string',
      unique: true,
      uuidv4: true,
      defaultsTo: () => uuid.v4(),
    },
    state: { type: 'string' },
    started: { type: 'string' },
    elapsed: { type: 'string' },
    percentComplete: { type: 'float' },
  },
};

