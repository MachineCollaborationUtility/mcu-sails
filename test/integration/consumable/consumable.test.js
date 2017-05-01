/* global describe, it */
const should = require('should');
// const request = require('request-promise');
const fs = require('fs-promise');
const path = require('path');
const requestPromise = require('request-promise');

const request = requestPromise.defaults({ json: true });

let file;
let fileArrayLength;

describe('Files unit test', function () {
  it('should upload a file and retrieve a file object', async function () {
    const testFilePath = path.join(__dirname, 'test.gcode');
    const fileUploadReply = await request.post({
      url: 'http://localhost:1337/consumable',
      formData: {
        consumable: fs.createReadStream(testFilePath),
      },
    })
    .catch(uploadError => console.log(uploadError));

    file = fileUploadReply[0];
    fileArrayLength = fileUploadReply.length;

    should.ok(Array.isArray(fileUploadReply));
    should.ok(fileArrayLength === 1);
    file.should.have.property('id');
    file.should.have.property('filename');
    file.should.have.property('filepath');

    // The file's id and the filepath should be identical
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/;
    const filepathParsed = file.filepath.match(uuidRegex);
    should.ok(Array.isArray(filepathParsed));
    should(file.id).equal(filepathParsed[0]);
  });

  it('should retrieve an array of files', async function () {
    const getFilesReply = await request({ url: 'http://localhost:1337/consumable' })
    .catch(getFilesError => console.log(getFilesError));

    should.ok(Array.isArray(getFilesReply));
    should(getFilesReply.length).equal(fileArrayLength);
  });

  it('should retrieve an a single file', async function () {
    const getFileReply = await request({ url: `http://localhost:1337/consumable/${file.id}` })
    .catch(getFileError => console.log(getFileError));

    should.deepEqual(file, getFileReply);
  });

  it('should fail when trying to retrieve a nonexistent file', async function () {
    await request({ url: 'http://localhost:1337/consumable/foobar' })
    .catch((getFakeFileError) => {
      should(getFakeFileError.statusCode).equal(500);
      should(getFakeFileError.error).equal('Consumable with id "foobar" not found');
    });
  });

  // it('should delete the file that was originally uploaded', function (done) {
  //   const requestParams = {
  //     method: 'DELETE',
  //     uri: 'http://localhost:9000/v1/files/',
  //     body: {
  //       uuid: fileUuid,
  //     },
  //     json: true,
  //   };
  //   request(requestParams)
  //   .then((deleteFileReply) => {
  //     should(deleteFileReply.data).equal(`File ${fileUuid} deleted`);
  //     should(deleteFileReply.status).equal(200);
  //     should(deleteFileReply.query).equal('Delete File');
  //     done();
  //   })
  //   .catch((err) => {
  //     logger.error(err);
  //     done();
  //   });
  // });

  // it('should have one less file in the file array after deleting a file', function (done) {
  //   const requestParams = {
  //     method: 'GET',
  //     uri: 'http://localhost:9000/v1/files',
  //     json: true,
  //   };
  //   request(requestParams)
  //   .then((getFilesReply) => {
  //     const files = getFilesReply.data;
  //     should(files.constructor).equal(Object);
  //     const newFileArrayLength = Object.keys(files).length;
  //     should(newFileArrayLength).equal(fileArrayLength - 1);
  //     done();
  //   })
  //   .catch((err) => {
  //     logger.error(err);
  //     done();
  //   });
  // });
});
