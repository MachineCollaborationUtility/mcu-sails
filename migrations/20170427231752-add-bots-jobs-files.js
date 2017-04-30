var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
  async.series([
    function (cb) {
      db.createTable('bot', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        model: 'string',
        uuid: 'string',

        // The identifier is either an ip address endpoint or a pnpid
        endpoint: 'string',
        jogXSpeed: 'int',
        jogYSpeed: 'int',
        jogZSpeed: 'int',
        jogESpeed: 'int',
        tempE: 'int',
        tempB: 'int',
        offsetX: 'real',
        offsetY: 'real',
        offsetZ: 'real',
        openString: 'string',
        custom: 'text',
        createdAt: 'datetime',
        updatedAt: 'timestamp',
      }, cb);
    },
    function (cb) {
      db.createTable('job', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        uuid: 'string',
        botUuid: 'string',
        fileUuid: 'string',
        state: 'string',
        started: 'string',
        elapsed: 'string',
        percentComplete: 'real',
        createdAt: 'datetime',
        updatedAt: 'timestamp',
      }, cb);
    },
    function (cb) {
      db.createTable('consumable', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        filename: 'string',
        filepath: 'string',
        uuid: 'string',
        createdAt: 'datetime',
        updatedAt: 'timestamp',
      }, cb);
    },
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    function (cb) {
      db.dropTable('bot', cb);
    },
    function (cb) {
      db.dropTable('job', cb);
    },
    function (cb) {
      db.dropTable('consumable', cb);
    },
  ], callback);
};
