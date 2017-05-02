 /* global describe, it */
const should = require('should');
// const request = require('request-promise');
const fs = require('fs-promise');
const path = require('path');
const requestPromise = require('request-promise');

const request = requestPromise.defaults({ json: true });

let consumable;
let consumableArrayLength;

describe('Files unit test', function () {
  it('should upload a file and retrieve a file object', async function () {
    const testFilePath = path.join(__dirname, 'test.gcode');
    const consumableUploadReply = await request.post({
      url: 'http://localhost:1337/consumable',
      formData: {
        consumable: fs.createReadStream(testFilePath),
      },
    })
    .catch(uploadError => console.log(uploadError));

    consumable = consumableUploadReply[0];
    consumableArrayLength = consumableUploadReply.length;

    should.ok(Array.isArray(consumableUploadReply));
    should.ok(consumableArrayLength === 1);
    consumable.should.have.property('id');
    consumable.should.have.property('filename');
    consumable.should.have.property('filepath');

    // The file's id and the filepath should be identical
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/;
    const filepathParsed = consumable.filepath.match(uuidRegex);
    should.ok(Array.isArray(filepathParsed));
    should(consumable.id).equal(filepathParsed[0]);
  });

  it('should retrieve an array of files', async function () {
    const getFilesReply = await request({ uri: 'http://localhost:1337/consumable' })
    .catch(getFilesError => console.log(getFilesError));

    should.ok(Array.isArray(getFilesReply));
    should(getFilesReply.length).equal(consumableArrayLength);
  });

  it('should retrieve an a single file', async function () {
    const getFileReply = await request({ uri: `http://localhost:1337/consumable/${consumable.id}` })
    .catch(getFileError => console.log(getFileError));

    should.deepEqual(consumable, getFileReply);
  });

  it('should fail when trying to retrieve a nonexistent file', async function () {
    await request({ uri: 'http://localhost:1337/consumable/foobar' })
    .catch((getFakeFileError) => {
      should(getFakeFileError.statusCode).equal(500);
      should(getFakeFileError.error).equal('Consumable with id "foobar" not found');
    });
  });

  it('should delete the file that was originally uploaded', async function () {
    const deleteConsumableReply = await request.delete({ uri: `http://localhost:1337/consumable/${consumable.id}` })
    .catch(deleteConsumableError => console.log(deleteConsumableError));

    should(deleteConsumableReply).deepEqual(consumable);
  });

  it('should have one less file in the file array after deleting a file', async function () {
    const getConsumablesReply = await request({ uri: 'http://localhost:1337/consumable' })
    .catch(getConsumablesError => console.log(getConsumablesError));

    should(Array.isArray(getConsumablesReply));
    should(consumableArrayLength).equal(getConsumablesReply.length + 1);
  });
});
