/* global describe, it */
const should = require('should');
const fs = require('fs-promise');
const path = require('path');
const requestPromise = require('request-promise');

const request = requestPromise.defaults({ json: true });

let job;
let nJobs;
let botUuid;
let consumableUuid;

describe('Jobs unit test', function () {
  it('should create a virtual bot to execute jobs on', async function () {
    const createVirtualBotReply = await request.post({
      uri: 'http://localhost:1337/bot',
      body: {
        name: 'Virtual Bot',
        model: 'Virtual',
      },
    })
    .catch(createBotError => console.log(createBotError));

    botUuid = createVirtualBotReply.id;
  });

  it('should upload a consumable file for a job to process', async function () {
    // Upload a consumable
    const testFilePath = path.join(__dirname, 'test.gcode');
    const consumableUploadReply = await request.post({
      url: 'http://localhost:1337/consumable',
      formData: {
        consumable: fs.createReadStream(testFilePath),
      },
    })
    .catch(uploadError => console.log(uploadError));

    consumableUuid = consumableUploadReply[0].id;
  });

  it('should create a job', async function () {
    job = await request.post({
      uri: 'http://localhost:1337/job',
      body: {
        botUuid,
        consumableUuid,
      },
    })
    .catch((createJobError) => { throw new Error(createJobError); });

    job.should.have.property('id');
    job.should.have.property('botUuid');
    job.should.have.property('consumableUuid');
    job.should.have.property('state');
    job.should.have.property('started');
    job.should.have.property('elapsed');
    job.should.have.property('percentComplete');
  });

  it('should have a job state of "initializing"', async function () {
    const getJobReply = await request({ uri: `http://localhost:1337/job/${job.id}` });
    should(getJobReply).deepEqual(job);
  });

  it('should retreive an array of existing jobs', async function () {
    const getJobsReply = await request({ uri: 'http://localhost:1337/job' })
    .catch(getJobsError => console.log(getJobsError));

    should.ok(Array.isArray(getJobsReply));
    nJobs = getJobsReply.length;
  });

  it('should delete a job', async function () {
    const deleteJobReply = await request.delete({ uri: `http://localhost:1337/job/${job.id}` })
    .catch((destroyJobError) => { throw new Error(destroyJobError); });

    should(deleteJobReply).deepEqual(job);
  });

  it('should have one less job after deleting a job', async function () {
    const getJobsReply = await request({ uri: 'http://localhost:1337/job' })
    .catch(getJobsError => console.log(getJobsError));

    should.ok(Array.isArray(getJobsReply));
    should(nJobs).equal(getJobsReply.length + 1);
  });
});
