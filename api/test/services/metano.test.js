const assert = require('assert');
const app = require('../../src/app');

describe('\'metano\' service', () => {
  it('registered the service', () => {
    const service = app.service('metano');

    assert.ok(service, 'Registered the service');
  });
});
