const assert = require('assert');
const app = require('../../src/app');

describe('\'temperatura\' service', () => {
  it('registered the service', () => {
    const service = app.service('temperatura');

    assert.ok(service, 'Registered the service');
  });
});
