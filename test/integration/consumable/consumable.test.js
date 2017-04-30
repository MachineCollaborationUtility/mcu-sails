/* global describe, it */
const should = require('should');
// const request = require('request-promise');
const fs = require('fs-promise');
const path = require('path');
const request = require('request-promise');

let fileUuid;
let fileArrayLength;

describe('Files unit test', function () {
  it('should upload a file and retrieve a file object', async function () {
    await Promise.delay(1000);

    const testFilePath = path.join(__dirname, 'test.gcode');

    const fileUploadReply = await request({
      url: 'http://localhost:1337/consumable',
      method: 'POST',
      formData: {
        consumable: fs.createReadStream(testFilePath),
      },
      json: true,
    })
    .catch(uploadError => console.log(uploadError));

    console.log(fileUploadReply);

    // const file = fs.createReadStream(testFilePath);
    // const formData = { file };
    // const requestParams = {
    //   method: 'POST',
    //   uri: 'http://localhost:1337/consumable',
    //   formData,
    //   json: true,
    // };
    
    // const uploadReply = await request(requestParams)
    // .catch(uploadError => console.log('upload error', uploadError));

    // console.log('upload reply!', uploadReply);
    // const files = uploadReply.data;
    // // Check that the returned object is an array with a single file object
    // // The file object should have a uuid and a name
    // should(files.length).equal(1);
    // should(!!files.uuid);
    // should(!!files.name);
    // should(uploadReply.status).equal(200);
    // should(uploadReply.query).equal('Upload File');
  // });

  // it('should retrieve a dictionary of files', function (done) {
  //   const requestParams = {
  //     method: 'GET',
  //     uri: 'http://localhost:9000/v1/files',
  //     json: true,
  //   };
  //   request(requestParams)
  //   .then((getFilesReply) => {
  //     const files = getFilesReply.data;
  //     should(files.constructor).equal(Object);
  //     should(getFilesReply.status).equal(200);
  //     should(getFilesReply.query).equal('Get Files');

  //     fileArrayLength = Object.keys(files).length;
  //     fileUuid = files[Object.keys(files)[0]].uuid;
  //     done();
  //   })
  //   .catch((err) => {
  //     logger.error(err);
  //     done();
  //   });
  // });

  // it('should retrieve an a single file', function (done) {
  //   const requestParams = {
  //     method: 'GET',
  //     uri: `http://localhost:9000/v1/files/${fileUuid}`,
  //     json: true,
  //   };
  //   request(requestParams)
  //   .then((getFileReply) => {
  //     const file = getFileReply.data;
  //     should(file.uuid).equal(fileUuid);
  //     should(getFileReply.status).equal(200);
  //     should(getFileReply.query).equal('Get File');
  //     done();
  //   })
  //   .catch((err) => {
  //     logger.error(err);
  //     done();
  //   });
  // });

  // it('should fail when trying to retrieve a nonexistent file', function (done) {
  //   const requestParams = {
  //     method: 'GET',
  //     uri: `http://localhost:9000/v1/files/${fileUuid}foobar`,
  //     json: true,
  //   };
  //   request(requestParams)
  //   .then((getFileReply) => {
  //     should(getFileReply).equal(false);
  //     done();
  //   })
  //   .catch((ex) => {
  //     should(ex.error.error).equal(`File ${fileUuid}foobar not found`);
  //     should(ex.error.status).equal(500);
  //     should(ex.error.query).equal('Get File');
  //     done();
  //   });
  // });

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
  });
});
