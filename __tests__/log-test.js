const request = require('supertest')
const {JsonLog, LogMiddlewareRest} = require('../src/index')

describe('Assert not null', () => {

  it('Assert not null', done => {
    expect(JsonLog).not.toBeNull()
    expect(LogMiddlewareRest).not.toBeNull()
    done()
  })

})
