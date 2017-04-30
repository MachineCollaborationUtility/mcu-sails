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
    id: {
      type: 'string',
      primaryKey: true,
      required: true,
      unique: true,
      uuidv4: true,
      defaultsTo: () => uuid.v4(),
    },
    filename: { type: 'string' },
    filepath: { type: 'string' },

    toJSON: function() {
      const obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    },
  },
};
