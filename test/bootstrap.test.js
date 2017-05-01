/* global before, after */
require('dotenv').config();
global.Promise = require('bluebird');
const sails = require('sails');

let rc;
try {
  rc = require('rc');
} catch (e0) {
  try {
    rc = require('sails/node_modules/rc');
  } catch (e1) {
    console.error('Could not find dependency: `rc`.');
    console.error('Your `.sailsrc` file(s) will be ignored.');
    console.error('To resolve this, run:');
    console.error('npm install rc --save');
    rc = function () { return {}; };
  }
}

before(function sailsStartHook(done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(10000);

  sails.lift({
    connections: {
      // Replace the following with whatever suits you.
      testDb: {
        adapter: 'sails-postgresql',
        host: 'localhost',
        database: 'mcu_sails_test',
      },
    },
    models: {
      connection: 'testDb',
      migrate: 'drop',
    },
  }, (err) => {
    if (err) { return done(err); }
    // here you can load fixtures, etc.
    return done(err, sails);
  });
});

after((done) => {
  sails.lower(done);
});
