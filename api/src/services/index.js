const temperatura = require('./temperatura/temperatura.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(temperatura);
};
