/**
 * Consumable.js
 *
 * @description :: Model for a Consumable
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
  },
};

