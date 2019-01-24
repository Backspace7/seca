// Initializes the `metano` service on path `/metano`
const createService = require('feathers-sequelize');
const createModel = require('../../models/metano.model');
const hooks = require('./metano.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/metano', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('metano');

  service.hooks(hooks);
};
