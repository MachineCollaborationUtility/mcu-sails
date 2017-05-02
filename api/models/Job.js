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
    id: {
      type: 'string',
      primaryKey: true,
      required: true,
      unique: true,
      uuidv4: true,
      defaultsTo: () => uuid.v4(),
    },
    botUuid: {
      type: 'string',
      unique: true,
      uuidv4: true,
      required: true,
    },
    consumableUuid: {
      type: 'string',
      unique: true,
      uuidv4: true,
      required: true,
    },
    state: {
      type: 'string',
      defaultsTo: 'initializing',
    },
    started: { type: 'string' },
    elapsed: { type: 'string' },
    percentComplete: { type: 'float' },
    toJSON: function () {
      const obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    },
  },
};
