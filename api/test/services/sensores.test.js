const assert = require('assert');
const app = require('../../src/app');

describe('\'sensores\' service', () => {
  it('registered the service', () => {
    const service = app.service('sensores');

    assert.ok(service, 'Registered the service');
  });
});
