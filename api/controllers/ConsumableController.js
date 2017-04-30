/* global Consumable */

/**
 * ConsumableController
 *
 * @description :: Server-side logic for managing consumables
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const fs = require('fs');

module.exports = {
/**
 * (POST /file)
 */
  create: function create(req, res) {
    req.file('consumable').upload({}, async (err, uploadedFiles) => {
      if (err) {
        return res.negotiate(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }

      const files = await Promise.map(uploadedFiles, async (file) => {
        const consumableObject = {
          filepath: file.fd,
          filename: file.filename,
        };
        await Consumable.create(consumableObject);
      })
      .catch(uploadError => res.negotiate(uploadError));

      return res.json(files);
    });
  },

  findOne: async function findOne(req, res) {
    const consumable = await Consumable.findOne({ id: req.param('id') });
    if (req.param('download') === 'true') {
      res.attachment(consumable.filepath);
      res.set('Content-Disposition', `attachment; filename="${consumable.filename}"`);
      return res.ok();
    }
    return res.json(consumable);
  },

  destroy: async function destroy(req, res, next) {
    Consumable.findOne(req.param('id'), (err, consumable) => {
      if (err) { return next(err); }
      if (!consumable) { return next('Consumable doesn\'t exist.'); }

      Consumable.destroy(req.param('id'), (destroyErr) => {
        if (destroyErr) { return next(destroyErr); }
        fs.unlink(consumable.filepath, (unlinkErr) => {
          if (err) { return next(err); }
          return res.json(consumable);
        });
      });
    });
  },
};
