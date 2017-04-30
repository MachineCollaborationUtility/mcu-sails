/**
 * Bot.js
 *
 * @description :: Model for a Bot
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
    name: { type: 'string', required: true },
    model: { type: 'string' },
    endpoint: { type: 'string' }, // The identifier is either an ip address endpoint or a pnpid
    jogXSpeed: { type: 'int', defaultsTo: 0 },
    jogYSpeed: { type: 'int', defaultsTo: 0 },
    jogZSpeed: { type: 'int', defaultsTo: 0 },
    jogESpeed: { type: 'int', defaultsTo: 0 },
    tempE: { type: 'int', defaultsTo: 0 },
    tempB: { type: 'int', defaultsTo: 0 },
    offsetX: { type: 'float', defaultsTo: 0.0 },
    offsetY: { type: 'float', defaultsTo: 0.0 },
    offsetZ: { type: 'float', defaultsTo: 0.0 },
    openString: { type: 'string', defaultsTo: '' },
    custom: { type: 'text' },
    toJSON: function() {
      const obj = this.toObject();
      if (typeof obj.custom === 'string') {
        obj.custom = JSON.stringify(obj.custom);
      }
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    },
  },
};

