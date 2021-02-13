const should     = require('should');
const JsonResult = require('../Class/JsonResult')

describe('** JsonResult Class test **', function () {
  it('JsonResult : new', function () {
    let newResult = new JsonResult(99, 'message');
    newResult.should.be.an.instanceOf(Object).and.have.property('code', 99);
  });

  it('JsonResult : success', function () {
    let successResult = JsonResult.success();
    successResult.should.be.an.instanceOf(Object).and.have.property('code', 0);
  });

  it('JsonResult : fail', function () {
    let failResult = JsonResult.fail();
    failResult.should.be.an.instanceOf(Object).and.have.property('code', -1);
  });
});
