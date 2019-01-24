// Initializes the `sensores` service on path `/sensores`
const createService = require('feathers-sequelize');
const createModel = require('../../models/sensores.model');
const hooks = require('./sensores.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sensores', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sensores');

  service.hooks(hooks);
};
