const temperatura = require('./temperatura/temperatura.service.js');
const users = require('./users/users.service.js');
const sensores = require('./sensores/sensores.service.js');
const metano = require('./metano/metano.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(temperatura);
  app.configure(users);
  app.configure(sensores);
  app.configure(metano);
};
